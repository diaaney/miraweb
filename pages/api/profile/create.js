import { supabase } from '../../../lib/supabase';
import { getMinecraftPlayer, getMinemenElo, getLocation } from '../../../lib/apis';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { discord_id, discord_username, minecraft_username } = req.body;

    if (!discord_id || !discord_username || !minecraft_username) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Get Minecraft player data
        const mcPlayer = await getMinecraftPlayer(minecraft_username);

        if (!mcPlayer) {
            return res.status(404).json({ error: 'Minecraft player not found' });
        }

        // Get Minemen Club ELO
        const eloData = await getMinemenElo(minecraft_username);

        // Get location from request IP
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const location = await getLocation(ip);

        // Check if profile already exists
        const { data: existingProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('discord_id', discord_id)
            .single();

        const profileData = {
            discord_id,
            discord_username,
            minecraft_username: mcPlayer.username,
            minecraft_uuid: mcPlayer.uuid,
            skin_url: mcPlayer.skinUrl,
            current_elo: eloData.currentElo,
            peak_elo: eloData.peakElo,
            city: location.city,
            state: location.state,
            country: location.country,
            country_emoji: location.countryEmoji,
            updated_at: new Date().toISOString()
        };

        let result;

        if (existingProfile) {
            // Update existing profile
            result = await supabase
                .from('profiles')
                .update(profileData)
                .eq('discord_id', discord_id)
                .select();
        } else {
            // Create new profile
            result = await supabase
                .from('profiles')
                .insert([profileData])
                .select();
        }

        if (result.error) {
            throw result.error;
        }

        res.status(200).json({
            success: true,
            profile: result.data[0]
        });

    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ error: 'Failed to create profile' });
    }
}
