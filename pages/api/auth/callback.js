import { getDiscordToken, getDiscordUser } from '../../../lib/apis';

export default async function handler(req, res) {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    try {
        // Exchange code for access token
        const tokenData = await getDiscordToken(code);

        if (!tokenData) {
            return res.status(500).json({ error: 'Failed to get Discord token' });
        }

        // Get user info
        const user = await getDiscordUser(tokenData.access_token);

        if (!user) {
            return res.status(500).json({ error: 'Failed to get Discord user' });
        }

        // Store user data in session/cookie and redirect to setup page
        // For simplicity, we'll use URL params (in production, use secure cookies)
        const params = new URLSearchParams({
            discord_id: user.id,
            discord_username: `${user.username}#${user.discriminator}`,
            avatar: user.avatar
        });

        res.redirect(`/setup?${params.toString()}`);
    } catch (error) {
        console.error('OAuth callback error:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
}
