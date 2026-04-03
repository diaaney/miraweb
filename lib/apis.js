import axios from 'axios';

// Fetch Minecraft player UUID and skin
export async function getMinecraftPlayer(username) {
    try {
        // Get UUID from username
        const uuidRes = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const uuid = uuidRes.data.id;
        const name = uuidRes.data.name;

        // Get skin URL
        const skinUrl = `https://crafatar.com/avatars/${uuid}?size=256&overlay`;

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

// Fetch Minemen Club ELO
// NOTE: This needs to be investigated - the actual endpoint may be different
export async function getMinemenElo(username) {
    try {
        // Method 1: Try direct API (if it exists)
        // const res = await axios.get(`https://minemen.club/api/player/${username}`);

        // Method 2: Scrape the profile page (needs investigation)
        // For now, returning mock data
        console.log(`Fetching MMC ELO for ${username} - needs implementation`);

        return {
            currentElo: 1000, // TODO: Replace with actual scraping/API call
            peakElo: 1200
        };
    } catch (error) {
        console.error('Error fetching Minemen ELO:', error);
        return { currentElo: 0, peakElo: 0 };
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

        return {
            city: data.city || 'Unknown',
            state: data.region || 'Unknown',
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
        const data = new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI
        });

        const res = await axios.post('https://discord.com/api/oauth2/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return res.data;
    } catch (error) {
        console.error('Error getting Discord token:', error);
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
