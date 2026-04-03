import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { User, Gamepad2 } from 'lucide-react';

export default function Setup() {
    const router = useRouter();
    const [minecraftUsername, setMinecraftUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [discordData, setDiscordData] = useState(null);

    useEffect(() => {
        if (!router.isReady) return;

        const { discord_id, discord_username, avatar } = router.query;

        if (!discord_id) {
            const discordAuthUrl = process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL ||
                `https://discord.com/api/oauth2/authorize?client_id=1441374733009682433&redirect_uri=${encodeURIComponent('https://miraweb-jade.vercel.app/api/auth/callback')}&response_type=code&scope=identify`;
            window.location.href = discordAuthUrl;
            return;
        }

        setDiscordData({
            discord_id,
            discord_username,
            avatar
        });
    }, [router.isReady, router.query]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/profile/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    discord_id: discordData.discord_id,
                    discord_username: discordData.discord_username,
                    minecraft_username: minecraftUsername
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create profile');
            }

            localStorage.setItem('mira_user', JSON.stringify(data.profile));
            router.push('/dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!discordData) {
        return (
            <div className="min-h-screen bg-[#111111] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-[#2a2a2a] border-t-zinc-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#111111] text-zinc-300 font-sans flex items-center justify-center px-8 selection:bg-zinc-800 selection:text-white">
            <div className="w-full max-w-[500px] flex flex-col items-center text-center">

                {/* Logo */}
                <h1 className="font-serif text-6xl font-bold text-zinc-100 mb-4 tracking-tight">
                    MIRA
                </h1>
                <p className="text-sm text-zinc-500 mb-12 tracking-wider font-medium">
                    PROFILE SYSTEM
                </p>

                {/* Main Box */}
                <div className="w-full rounded-2xl border border-[#2a2a2a] bg-[#161616] p-10 shadow-lg shadow-black/40 mb-4">
                    <h2 className="font-serif text-2xl text-zinc-100 mb-2">Setup Profile</h2>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                        Configure your Minecraft profile information
                    </p>

                    {/* Discord Account */}
                    {discordData.avatar && (
                        <div className="flex items-center gap-4 p-4 mb-6 bg-[#111111] rounded-lg border border-[#2a2a2a]">
                            <img
                                src={`https://cdn.discordapp.com/avatars/${discordData.discord_id}/${discordData.avatar}.png?size=128`}
                                alt="Discord Avatar"
                                className="w-12 h-12 rounded-lg"
                            />
                            <div className="text-left flex-1">
                                <p className="text-xs text-zinc-500 mb-1">Connected Account</p>
                                <p className="text-sm text-zinc-100 font-medium">{discordData.discord_username}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="text-left">
                            <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                                Minecraft Username
                            </label>
                            <input
                                type="text"
                                value={minecraftUsername}
                                onChange={(e) => setMinecraftUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                                className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-[#404040] transition-colors"
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-950/20 border border-red-900/50 rounded-lg text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2a2a2a] hover:bg-[#333333] disabled:bg-[#1a1a1a] disabled:text-zinc-600 text-zinc-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            {loading ? 'Creating Profile...' : 'Create Profile'}
                        </button>
                    </form>
                </div>

                {/* Auto Detection Info */}
                <div className="text-xs text-zinc-500 tracking-wide">
                    <span className="text-zinc-400">Auto-detected:</span> Skin • ELO • Location
                </div>

            </div>
        </div>
    );
}
