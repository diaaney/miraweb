import { useRouter } from 'next/router';

export default function Layout({ children, user, onLogout }) {
    const router = useRouter();
    const currentPath = router.pathname;

    const getCountryFlag = (countryCode) => {
        // Map country codes to Unicode flag representations
        const flags = {
            'US': '🇺🇸',
            'MX': '🇲🇽',
            'CA': '🇨🇦',
            'GB': '🇬🇧',
            'BR': '🇧🇷',
            'AR': '🇦🇷',
            'CL': '🇨🇱',
            'CO': '🇨🇴',
            'PE': '🇵🇪',
            'VE': '🇻🇪',
        };
        return flags[countryCode] || countryCode;
    };

    const menuItems = [
        { name: 'Profile', path: '/dashboard' },
        { name: 'Products', path: '/products', badge: 'Soon' }
    ];

    return (
        <div style={styles.wrapper}>
            {/* Top Bar */}
            <div style={styles.topBar}>
                <div style={styles.topBarContent}>
                    <div style={styles.location}>
                        {user.city}, {user.state} • {user.country}
                    </div>
                    <div style={styles.topRight}>
                        <span style={styles.username}>{user.discord_username}</span>
                        <button onClick={onLogout} style={styles.logoutBtn}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div style={styles.container}>
                {/* Sidebar */}
                <aside style={styles.sidebar}>
                    <div style={styles.sidebarContent}>
                        <div style={styles.logo}>
                            <h1 style={styles.logoText}>MIRA</h1>
                        </div>

                        <nav style={styles.nav}>
                            {menuItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => router.push(item.path)}
                                    style={{
                                        ...styles.navItem,
                                        ...(currentPath === item.path ? styles.navItemActive : {})
                                    }}
                                >
                                    <span>{item.name}</span>
                                    {item.badge && (
                                        <span style={styles.badge}>{item.badge}</span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main style={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
    },
    topBar: {
        height: '48px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e9ecef',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    topBarContent: {
        maxWidth: '1400px',
        margin: '0 auto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
    },
    location: {
        fontSize: '13px',
        color: '#6c757d',
        fontWeight: '500',
    },
    topRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    username: {
        fontSize: '14px',
        color: '#212529',
        fontWeight: '600',
    },
    logoutBtn: {
        backgroundColor: 'transparent',
        border: '1px solid #dee2e6',
        color: '#495057',
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    container: {
        display: 'flex',
        maxWidth: '1400px',
        margin: '0 auto',
        paddingTop: '48px',
    },
    sidebar: {
        width: '220px',
        padding: '40px 0',
        position: 'sticky',
        top: '48px',
        height: 'calc(100vh - 48px)',
    },
    sidebarContent: {
        padding: '0 32px',
    },
    logo: {
        marginBottom: '48px',
    },
    logoText: {
        fontSize: '24px',
        fontWeight: '800',
        color: '#0d47a1',
        margin: 0,
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '6px',
        color: '#6c757d',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'left',
    },
    navItemActive: {
        backgroundColor: '#e7f1ff',
        color: '#0d47a1',
        fontWeight: '600',
    },
    badge: {
        backgroundColor: '#e9ecef',
        color: '#6c757d',
        fontSize: '11px',
        fontWeight: '600',
        padding: '2px 8px',
        borderRadius: '4px',
    },
    main: {
        flex: 1,
        padding: '40px 32px',
        maxWidth: '900px',
    },
};
