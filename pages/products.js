import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Settings, Package, LogOut } from 'lucide-react';

const CountryFlag = ({ country }) => {
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

export default function Products() {
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
                            className="hover:text-zinc-100 transition-colors duration-200 text-left"
                        >
                            profile
                        </button>
                        <button
                            onClick={() => router.push('/products')}
                            className="hover:text-zinc-100 transition-colors duration-200 text-left text-zinc-100"
                        >
                            products
                        </button>
                    </div>

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

                        {/* Coming Soon Box */}
                        <div className="rounded-2xl border border-[#2a2a2a] bg-[#161616] p-16 flex flex-col items-center justify-center hover:border-[#404040] transition-colors duration-300 shadow-lg shadow-black/40 min-h-[400px]">
                            <div className="w-24 h-24 rounded-full border border-[#2a2a2a] bg-[#111111] flex items-center justify-center mb-6">
                                <Package size={40} className="text-zinc-500" strokeWidth={1.5} />
                            </div>
                            <h2 className="font-serif text-3xl text-zinc-100 mb-3">Products</h2>
                            <div className="inline-block px-4 py-1 bg-[#2a2a2a] text-zinc-400 text-xs font-medium rounded-full mb-6 tracking-wider">
                                COMING SOON
                            </div>
                            <p className="text-sm text-zinc-400 text-center max-w-md leading-relaxed">
                                Premium features and exclusive items are on the way. Stay tuned for updates.
                            </p>
                        </div>

                    </div>
                </main>

            </div>
        </div>
    );
}
