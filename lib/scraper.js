import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

/**
 * Scrape Minemen Club profile using Puppeteer (fallback method)
 * This is used when simple HTTP requests fail due to anti-bot protection
 */
export async function scrapeMinemenWithBrowser(username) {
    let browser = null;

    try {
        console.log(`[MMC Puppeteer] Launching browser for ${username}...`);

        // Launch browser with chromium for Vercel compatibility
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });

        const page = await browser.newPage();

        // Set user agent to appear as real browser
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Navigate to player profile
        const url = `https://minemen.club/player/${username}`;
        console.log(`[MMC Puppeteer] Navigating to ${url}...`);

        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 15000
        });

        // Wait for content to load
        await page.waitForSelector('body', { timeout: 10000 });

        // Extract ELO data from the page
        const eloData = await page.evaluate(() => {
            const text = document.body.innerText;

            // Look for Global ELO
            const globalEloMatch = text.match(/Global ELO[:\s]+(\d+)/i);
            const currentElo = globalEloMatch ? parseInt(globalEloMatch[1]) : null;

            // Look for Peak ELO
            const peakEloMatch = text.match(/Peak[:\s]+(\d+)/i) || text.match(/Highest[:\s]+(\d+)/i);
            const peakElo = peakEloMatch ? parseInt(peakEloMatch[1]) : currentElo;

            return {
                currentElo: currentElo || 1000,
                peakElo: peakElo || currentElo || 1000
            };
        });

        console.log(`[MMC Puppeteer] Success - Current: ${eloData.currentElo}, Peak: ${eloData.peakElo}`);

        await browser.close();
        return eloData;

    } catch (error) {
        console.error('[MMC Puppeteer] Error:', error.message);
        if (browser) await browser.close();

        // Return default values if everything fails
        return { currentElo: 1000, peakElo: 1000 };
    }
}
