import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
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
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {/* Animated Background */}
                <div style={styles.bgGradient}></div>

                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.logo}>MIRA</h1>
                    <p style={styles.subtitle}>PREMIUM PROFILE SYSTEM</p>
                </div>

                {/* Main Card */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle}>Welcome Back</h2>
                        <p style={styles.cardSubtitle}>Connect your Discord account to access your premium profile</p>
                    </div>

                    <div style={styles.loginSection}>
                        <button onClick={handleLogin} style={styles.button}>
                            <span style={styles.buttonIcon}>
                                <svg width="20" height="20" viewBox="0 0 71 55" fill="none">
                                    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
                                </svg>
                            </span>
                            Login with Discord
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div style={styles.featuresSection}>
                        <div style={styles.featuresGrid}>
                            <div style={styles.featureItem}>
                                <div style={styles.featureIcon}>🎮</div>
                                <div style={styles.featureContent}>
                                    <h4 style={styles.featureLabel}>Minecraft Profile</h4>
                                    <p style={styles.featureDescription}>Auto-synced skin & username</p>
                                </div>
                            </div>
                            <div style={styles.featureItem}>
                                <div style={styles.featureIcon}>⚔️</div>
                                <div style={styles.featureContent}>
                                    <h4 style={styles.featureLabel}>Live ELO Tracking</h4>
                                    <p style={styles.featureDescription}>Real-time stats from Minemen Club</p>
                                </div>
                            </div>
                            <div style={styles.featureItem}>
                                <div style={styles.featureIcon}>🌍</div>
                                <div style={styles.featureContent}>
                                    <h4 style={styles.featureLabel}>Location Data</h4>
                                    <p style={styles.featureDescription}>Automatic geo-detection</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    bgGradient: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(88, 101, 242, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    loadingContainer: {
        minHeight: '100vh',
        backgroundColor: '#0a0e27',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingSpinner: {
        width: '40px',
        height: '40px',
        border: '3px solid #1a2142',
        borderTop: '3px solid #5865f2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    content: {
        maxWidth: '600px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
    },
    header: {
        textAlign: 'center',
        marginBottom: '32px',
    },
    logo: {
        fontSize: '56px',
        fontWeight: '800',
        color: '#ffffff',
        letterSpacing: '10px',
        margin: 0,
        marginBottom: '8px',
        textShadow: '0 0 60px rgba(88, 101, 242, 0.4)',
    },
    subtitle: {
        fontSize: '11px',
        fontWeight: '700',
        color: '#5865f2',
        letterSpacing: '4px',
        margin: 0,
        textTransform: 'uppercase',
    },
    card: {
        backgroundColor: '#0f1535',
        border: '1px solid #1a2142',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    cardHeader: {
        padding: '40px 32px 32px',
        borderBottom: '1px solid #1a2142',
        textAlign: 'center',
    },
    cardTitle: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#ffffff',
        margin: 0,
        marginBottom: '8px',
        letterSpacing: '0.5px',
    },
    cardSubtitle: {
        fontSize: '14px',
        color: '#8b92b8',
        margin: 0,
        lineHeight: '1.6',
    },
    loginSection: {
        padding: '40px 32px',
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #1a2142',
    },
    button: {
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        padding: '14px 28px',
        fontSize: '12px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        boxShadow: '0 8px 24px rgba(88, 101, 242, 0.4)',
    },
    buttonIcon: {
        display: 'flex',
        alignItems: 'center',
    },
    featuresSection: {
        padding: '32px',
    },
    featuresGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    featureItem: {
        display: 'flex',
        gap: '16px',
        padding: '20px',
        backgroundColor: '#0a0e27',
        border: '1px solid #1a2142',
        borderRadius: '12px',
        transition: 'all 0.2s ease',
    },
    featureIcon: {
        fontSize: '24px',
        lineHeight: '1',
    },
    featureContent: {
        flex: 1,
    },
    featureLabel: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
        margin: 0,
        marginBottom: '4px',
        letterSpacing: '0.3px',
    },
    featureDescription: {
        fontSize: '12px',
        color: '#8b92b8',
        margin: 0,
        lineHeight: '1.5',
    },
};
