import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children, user, onLogout }) {
    const router = useRouter();
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(router.pathname);
    }, [router.pathname]);

    const menuItems = [
        { name: 'Profile', path: '/dashboard', icon: '👤' },
        { name: 'Products', path: '/products', icon: '🛍️', badge: 'SOON' }
    ];

    return (
        <div style={styles.container}>
            {/* Top Bar with Location */}
            {user && (
                <div style={styles.topBar}>
                    <div style={styles.locationContainer}>
                        <span style={styles.locationIcon}>📍</span>
                        <span style={styles.locationText}>
                            {user.city}, {user.state} {user.country_emoji}
                        </span>
                    </div>
                    <div style={styles.topBarRight}>
                        <span style={styles.username}>{user.discord_username}</span>
                        <button onClick={onLogout} style={styles.logoutButton}>
                            Logout
                        </button>
                    </div>
                </div>
            )}

            <div style={styles.mainContainer}>
                {/* Sidebar */}
                {user && (
                    <div style={styles.sidebar}>
                        <div style={styles.sidebarHeader}>
                            <h1 style={styles.logo}>MIRA</h1>
                            <p style={styles.logoSubtitle}>PREMIUM</p>
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
                                    <span style={styles.navIcon}>{item.icon}</span>
                                    <span style={styles.navLabel}>{item.name}</span>
                                    {item.badge && (
                                        <span style={styles.badge}>{item.badge}</span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}

                {/* Main Content */}
                <div style={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#0a0e27',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    topBar: {
        height: '50px',
        backgroundColor: '#0f1535',
        borderBottom: '1px solid #1a2142',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    locationContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    locationIcon: {
        fontSize: '14px',
    },
    locationText: {
        fontSize: '13px',
        color: '#8b92b8',
        fontWeight: '500',
        letterSpacing: '0.3px',
    },
    topBarRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    username: {
        fontSize: '13px',
        color: '#ffffff',
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: 'transparent',
        border: '1px solid #1a2142',
        color: '#8b92b8',
        padding: '6px 14px',
        borderRadius: '8px',
        fontSize: '11px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    mainContainer: {
        display: 'flex',
        paddingTop: '50px',
    },
    sidebar: {
        width: '240px',
        backgroundColor: '#0f1535',
        borderRight: '1px solid #1a2142',
        minHeight: 'calc(100vh - 50px)',
        position: 'fixed',
        left: 0,
        top: '50px',
        padding: '32px 16px',
    },
    sidebarHeader: {
        textAlign: 'center',
        marginBottom: '40px',
        padding: '0 16px',
    },
    logo: {
        fontSize: '28px',
        fontWeight: '800',
        color: '#ffffff',
        letterSpacing: '6px',
        margin: 0,
        marginBottom: '4px',
        textShadow: '0 0 30px rgba(88, 101, 242, 0.3)',
    },
    logoSubtitle: {
        fontSize: '9px',
        fontWeight: '700',
        color: '#5865f2',
        letterSpacing: '3px',
        margin: 0,
        textTransform: 'uppercase',
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '12px',
        color: '#8b92b8',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'left',
        position: 'relative',
    },
    navItemActive: {
        backgroundColor: '#1a2142',
        color: '#ffffff',
    },
    navIcon: {
        fontSize: '18px',
        width: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    navLabel: {
        flex: 1,
        letterSpacing: '0.3px',
    },
    badge: {
        backgroundColor: '#5865f2',
        color: '#ffffff',
        fontSize: '9px',
        fontWeight: '700',
        padding: '3px 8px',
        borderRadius: '6px',
        letterSpacing: '0.5px',
    },
    content: {
        flex: 1,
        marginLeft: '240px',
        padding: '40px',
        minHeight: 'calc(100vh - 50px)',
    },
};
