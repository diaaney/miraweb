import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Settings, Trophy, TrendingUp, User, LogOut, ChevronRight } from 'lucide-react';

// SVG Flag component - will be replaced with actual country flag
const CountryFlag = ({ country }) => {
  // Simple placeholder - can be customized per country
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-2 inline-block rounded-[2px] shadow-sm opacity-90"
    >
      <rect width="18" height="14" fill="#BF0A30"/>
      <rect width="18" height="1.5" y="2" fill="#FFFFFF"/>
      <rect width="18" height="1.5" y="6" fill="#FFFFFF"/>
      <rect width="18" height="1.5" y="10" fill="#FFFFFF"/>
      <rect width="8" height="8" fill="#002868"/>
    </svg>
  );
};

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('mira_user');
        if (!userData) {
            router.push('/');
        } else {
            setUser(JSON.parse(userData));
            setIsLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('mira_user');
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#111111] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-[#2a2a2a] border-t-zinc-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#111111] text-zinc-300 font-sans flex justify-center py-20 px-8 selection:bg-zinc-800 selection:text-white">

            <div className="w-full max-w-[900px] flex flex-col md:flex-row gap-8 lg:gap-16 items-start">

                {/* Sidebar */}
                <nav className="w-24 flex flex-col gap-6 shrink-0 md:mt-[104px]">
                    <div className="flex flex-col gap-3 text-base font-serif italic tracking-wide text-zinc-400">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="hover:text-zinc-100 transition-colors duration-200 text-left text-zinc-100"
                        >
                            profile
                        </button>
                        <button
                            onClick={() => router.push('/products')}
                            className="hover:text-zinc-100 transition-colors duration-200 text-left"
                        >
                            products
                        </button>
                    </div>

                    {/* Icons */}
                    <div className="mt-2 flex gap-2">
                        <div className="border border-[#2a2a2a] w-8 h-8 rounded-md flex items-center justify-center hover:bg-[#1a1a1a] hover:border-[#404040] transition-all cursor-pointer group">
                            <Settings size={16} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                        </div>
                        <button
                            onClick={handleLogout}
                            className="border border-[#2a2a2a] w-8 h-8 rounded-md flex items-center justify-center hover:bg-red-950/20 hover:border-red-900/50 transition-all cursor-pointer group"
                        >
                            <LogOut size={15} className="text-zinc-500 group-hover:text-red-400 transition-colors ml-[2px]" />
                        </button>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1 flex flex-col">

                    {/* Location Bar */}
                    <div className="flex justify-center md:justify-start lg:justify-center mb-16 h-[40px] items-center">
                        <div className="flex items-center text-sm font-medium tracking-wider text-zinc-400">
                            {user.city}, {user.state}
                            <CountryFlag country={user.country} />
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="flex flex-col gap-6">

                        {/* First Row: Large Box + Square Box */}
                        <div className="flex flex-col md:flex-row gap-6 h-auto md:h-72">

                            {/* Large Box - Profile Info */}
                            <div className="flex-1 rounded-2xl border border-[#2a2a2a] bg-[#161616] p-8 flex flex-col hover:border-[#404040] transition-colors duration-300 group cursor-pointer shadow-lg shadow-black/40">
                                <div className="flex items-center gap-4 mb-4">
                                    {user.skin_url && (
                                        <img
                                            src={user.skin_url}
                                            alt="Minecraft Skin"
                                            className="w-16 h-16 rounded-lg border border-[#2a2a2a]"
                                        />
                                    )}
                                    <div>
                                        <h2 className="font-serif text-2xl text-zinc-100">{user.minecraft_username}</h2>
                                        <p className="text-sm text-zinc-500">{user.discord_username}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    Gaming profile with live ELO tracking from Minemen Club. Automatically synced skin and statistics.
                                </p>
                                <div className="mt-auto pt-6 flex items-center justify-between text-xs text-zinc-500">
                                    <span>Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                    <div className="flex items-center text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Stats <ChevronRight size={14} className="ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Square Box - Status */}
                            <div className="w-full md:w-72 rounded-2xl border border-[#2a2a2a] bg-[#161616] p-8 flex flex-col items-center justify-center hover:border-[#404040] transition-colors duration-300 group shadow-lg shadow-black/40">
                                <div className="w-20 h-20 rounded-full border border-[#2a2a2a] bg-[#111111] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500">
                                    <User size={32} className="text-zinc-400 group-hover:text-zinc-100 transition-colors" strokeWidth={1.5} />
                                </div>
                                <span className="font-serif text-zinc-200">Active</span>
                                <span className="text-xs text-zinc-500 mt-1">Profile Online</span>
                            </div>

                        </div>

                        {/* Second Row: Wide Box - ELO Stats */}
                        <div className="h-48 rounded-2xl border border-[#2a2a2a] bg-[#161616] p-8 flex flex-col hover:border-[#404040] transition-colors duration-300 shadow-lg shadow-black/40">
                            <div className="flex items-center gap-3 mb-6">
                                <Trophy size={18} className="text-zinc-500" />
                                <h3 className="font-serif text-lg text-zinc-100">ELO Statistics</h3>
                            </div>

                            {/* ELO Bars */}
                            <div className="flex-1 flex flex-col justify-center gap-4 w-full">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-zinc-400 w-24">Peak ELO</span>
                                    <div className="flex-1 h-3 bg-[#2a2a2a] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-zinc-500/70 rounded-full flex items-center justify-end pr-3"
                                            style={{ width: `${Math.min((user.peak_elo / 2000) * 100, 100)}%` }}
                                        >
                                            <span className="text-xs text-zinc-200 font-medium">{user.peak_elo}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-zinc-400 w-24">Current ELO</span>
                                    <div className="flex-1 h-3 bg-[#2a2a2a] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-zinc-500/50 rounded-full flex items-center justify-end pr-3"
                                            style={{ width: `${Math.min((user.current_elo / 2000) * 100, 100)}%` }}
                                        >
                                            <span className="text-xs text-zinc-200 font-medium">{user.current_elo}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>

            </div>
        </div>
    );
}
