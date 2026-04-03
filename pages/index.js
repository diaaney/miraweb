import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LogIn } from 'lucide-react';

export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('mira_user');
        if (userData) {
            router.push('/dashboard');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    const handleLogin = () => {
        const discordAuthUrl = process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL ||
            `https://discord.com/api/oauth2/authorize?client_id=1441374733009682433&redirect_uri=${encodeURIComponent('https://miraweb-jade.vercel.app/api/auth/callback')}&response_type=code&scope=identify`;
        window.location.href = discordAuthUrl;
    };

    if (isLoading) {
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
                <div className="w-full rounded-2xl border border-[#2a2a2a] bg-[#161616] p-10 shadow-lg shadow-black/40 mb-8">
                    <h2 className="font-serif text-2xl text-zinc-100 mb-3">Welcome</h2>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                        Connect your Discord account to create your gaming profile with live stats and tracking.
                    </p>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-[#2a2a2a] hover:bg-[#333333] text-zinc-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
                    >
                        <LogIn size={18} className="text-zinc-400 group-hover:text-zinc-100 transition-colors" />
                        Login with Discord
                    </button>
                </div>

                {/* Features */}
                <div className="w-full grid grid-cols-3 gap-4 text-center">
                    <div className="p-4">
                        <h3 className="text-xs font-semibold text-zinc-100 mb-1">Minecraft</h3>
                        <p className="text-xs text-zinc-500">Auto sync</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xs font-semibold text-zinc-100 mb-1">ELO Stats</h3>
                        <p className="text-xs text-zinc-500">Live tracking</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xs font-semibold text-zinc-100 mb-1">Location</h3>
                        <p className="text-xs text-zinc-500">Auto-detect</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
