import { supabase } from '../../../lib/supabase';
import { getMinecraftPlayer, getMinemenElo, getLocation } from '../../../lib/apis';

/**
 * API endpoint to refresh/update an existing profile
 * This re-fetches all data (skin, ELO, location) and updates the database
 */
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { discord_id } = req.body;

    if (!discord_id) {
        return res.status(400).json({ error: 'Missing discord_id' });
    }

    try {
        // Get existing profile
        const { data: existingProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('discord_id', discord_id)
            .single();

        if (fetchError || !existingProfile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // Re-fetch all data
        const mcPlayer = await getMinecraftPlayer(existingProfile.minecraft_username);
        const eloData = await getMinemenElo(existingProfile.minecraft_username);

        // Get fresh location
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const location = await getLocation(ip);

        // Update profile with fresh data
        const profileData = {
            skin_url: mcPlayer?.skinUrl || existingProfile.skin_url,
            current_elo: eloData.currentElo,
            peak_elo: Math.max(eloData.peakElo, existingProfile.peak_elo, eloData.currentElo),
            city: location.city,
            state: location.state, // This will now be abbreviated
            country: location.country,
            country_emoji: location.countryEmoji,
            updated_at: new Date().toISOString()
        };

        const { data: result, error: updateError } = await supabase
            .from('profiles')
            .update(profileData)
            .eq('discord_id', discord_id)
            .select();

        if (updateError) {
            throw updateError;
        }

        res.status(200).json({
            success: true,
            profile: result[0],
            message: 'Profile updated successfully'
        });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
}
