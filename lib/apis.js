import axios from 'axios';
import { scrapeMinemenWithBrowser } from './scraper.js';

// Fetch Minecraft player UUID and skin
export async function getMinecraftPlayer(username) {
    try {
        // Get UUID from username
        const uuidRes = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const uuid = uuidRes.data.id;
        const name = uuidRes.data.name;

        // Get skin URL using Minotar (more reliable)
        const skinUrl = `https://minotar.net/helm/${name}/256.png`;

        return {
            uuid,
            username: name,
            skinUrl
        };
    } catch (error) {
        console.error('Error fetching Minecraft player:', error);
        return null;
    }
}

// Fetch Minemen Club ELO by scraping the profile page
export async function getMinemenElo(username) {
    try {
        console.log(`[MMC] Fetching ELO for ${username}...`);

        // Method 1: Try direct HTTP request first (fast, lightweight)
        try {
            const url = `https://minemen.club/player/${username}`;
            const res = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Referer': 'https://minemen.club/',
                    'DNT': '1',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1'
                },
                timeout: 10000
            });

            const html = res.data;

            // Extract Global ELO using regex
            const globalEloMatch = html.match(/Global ELO[:\s]+(\d+)/i);
            const currentElo = globalEloMatch ? parseInt(globalEloMatch[1]) : null;

            if (currentElo) {
                // Try to find peak ELO
                const peakEloMatch = html.match(/Peak[:\s]+(\d+)/i) || html.match(/Highest[:\s]+(\d+)/i);
                const peakElo = peakEloMatch ? parseInt(peakEloMatch[1]) : currentElo;

                console.log(`[MMC HTTP] Success - Current: ${currentElo}, Peak: ${peakElo}`);
                return { currentElo, peakElo };
            }
        } catch (httpError) {
            console.log(`[MMC HTTP] Failed (${httpError.message}), trying browser method...`);
        }

        // Method 2: Use Puppeteer as fallback (slower but more reliable)
        console.log(`[MMC] Falling back to browser scraping...`);
        return await scrapeMinemenWithBrowser(username);

    } catch (error) {
        console.error('[MMC] All methods failed:', error.message);
        // Return default values if everything fails
        return { currentElo: 1000, peakElo: 1000 };
    }
}

// Get location from IP address
export async function getLocation(ip) {
    try {
        // Using ipapi.co for free IP geolocation
        const res = await axios.get(`https://ipapi.co/${ip}/json/`);
        const data = res.data;

        // Get country emoji from country code
        const countryEmoji = getCountryEmoji(data.country_code);

        // Get state abbreviation (region_code is the abbreviated version)
        const stateAbbrev = data.region_code || data.region || 'Unknown';

        return {
            city: data.city || 'Unknown',
            state: stateAbbrev,
            country: data.country_name || 'Unknown',
            countryEmoji: countryEmoji
        };
    } catch (error) {
        console.error('Error fetching location:', error);
        return {
            city: 'Unknown',
            state: 'Unknown',
            country: 'Unknown',
            countryEmoji: '🌍'
        };
    }
}

// Convert country code to emoji
function getCountryEmoji(countryCode) {
    if (!countryCode) return '🌍';

    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());

    return String.fromCodePoint(...codePoints);
}

// Exchange Discord OAuth2 code for access token
export async function getDiscordToken(code) {
    try {
        console.log('[getDiscordToken] Starting token exchange...');
        console.log('[getDiscordToken] Client ID exists:', !!process.env.DISCORD_CLIENT_ID);
        console.log('[getDiscordToken] Client Secret exists:', !!process.env.DISCORD_CLIENT_SECRET);
        console.log('[getDiscordToken] Redirect URI exists:', !!process.env.DISCORD_REDIRECT_URI);

        const data = new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI
        });

        console.log('[getDiscordToken] Making request to Discord API...');
        const res = await axios.post('https://discord.com/api/oauth2/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log('[getDiscordToken] Success! Token received');
        return res.data;
    } catch (error) {
        console.error('[getDiscordToken] Error:', error.response?.data || error.message);
        return null;
    }
}

// Get Discord user info from access token
export async function getDiscordUser(accessToken) {
    try {
        const res = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return res.data;
    } catch (error) {
        console.error('Error getting Discord user:', error);
        return null;
    }
}
