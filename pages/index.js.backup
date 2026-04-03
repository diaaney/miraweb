export default function Home() {
    const handleLogin = () => {
        const discordAuthUrl = process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL ||
            `https://discord.com/api/oauth2/authorize?client_id=1441374733009682433&redirect_uri=${encodeURIComponent('https://miraweb-jade.vercel.app/api/auth/callback')}&response_type=code&scope=identify`;
        window.location.href = discordAuthUrl;
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.logo}>MIRA</h1>
                    <p style={styles.subtitle}>PROFILE SYSTEM</p>
                </div>

                {/* Main Card */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle}>Account</h2>
                        <p style={styles.cardSubtitle}>Connect your Discord account to create your gaming profile</p>
                    </div>

                    <div style={styles.loginSection}>
                        <button onClick={handleLogin} style={styles.button}>
                            <span style={styles.buttonIcon}>
                                <svg width="20" height="20" viewBox="0 0 71 55" fill="none">
                                    <g clipPath="url(#clip0)">
                                        <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
                                    </g>
                                </svg>
                            </span>
                            LOGIN WITH DISCORD
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div style={styles.featuresSection}>
                        <h3 style={styles.featuresTitle}>Profile Information</h3>
                        <div style={styles.featuresGrid}>
                            <div style={styles.featureItem}>
                                <div style={styles.featureIcon}>🎮</div>
                                <div style={styles.featureContent}>
                                    <h4 style={styles.featureLabel}>Minecraft</h4>
                                    <p style={styles.featureDescription}>Your skin & username</p>
                                </div>
                            </div>
                            <div style={styles.featureItem}>
                                <div style={styles.featureIcon}>⚔️</div>
                                <div style={styles.featureContent}>
                                    <h4 style={styles.featureLabel}>ELO Stats</h4>
                                    <p style={styles.featureDescription}>Peak & current rating</p>
                                </div>
                            </div>
                            <div style={styles.featureItem}>
                                <div style={styles.featureIcon}>🌍</div>
                                <div style={styles.featureContent}>
                                    <h4 style={styles.featureLabel}>Location</h4>
                                    <p style={styles.featureDescription}>City, state & country</p>
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
        backgroundColor: '#0a0a0a',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        maxWidth: '900px',
        width: '100%'
    },
    header: {
        textAlign: 'center',
        marginBottom: '48px'
    },
    logo: {
        fontSize: '48px',
        fontWeight: '800',
        color: '#ffffff',
        letterSpacing: '8px',
        margin: 0,
        marginBottom: '8px',
        textShadow: '0 0 40px rgba(255,255,255,0.1)'
    },
    subtitle: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#666',
        letterSpacing: '4px',
        margin: 0,
        textTransform: 'uppercase'
    },
    card: {
        backgroundColor: '#141414',
        border: '1px solid #1f1f1f',
        borderRadius: '2px',
        overflow: 'hidden'
    },
    cardHeader: {
        padding: '32px 40px',
        borderBottom: '1px solid #1f1f1f'
    },
    cardTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#ffffff',
        margin: 0,
        marginBottom: '8px',
        letterSpacing: '0.5px'
    },
    cardSubtitle: {
        fontSize: '13px',
        color: '#888',
        margin: 0,
        lineHeight: '1.6'
    },
    loginSection: {
        padding: '40px',
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #1f1f1f'
    },
    button: {
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        borderRadius: '2px',
        padding: '14px 32px',
        fontSize: '12px',
        fontWeight: '700',
        letterSpacing: '1px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.2s ease',
        textTransform: 'uppercase',
        boxShadow: '0 4px 12px rgba(88, 101, 242, 0.3)',
    },
    buttonIcon: {
        display: 'flex',
        alignItems: 'center',
        opacity: 0.9
    },
    featuresSection: {
        padding: '40px'
    },
    featuresTitle: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
        margin: 0,
        marginBottom: '24px',
        letterSpacing: '0.5px',
        textTransform: 'uppercase'
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
    },
    featureItem: {
        display: 'flex',
        gap: '16px',
        padding: '20px',
        backgroundColor: '#0a0a0a',
        border: '1px solid #1f1f1f',
        borderRadius: '2px',
        transition: 'border-color 0.2s ease'
    },
    featureIcon: {
        fontSize: '24px',
        lineHeight: '1'
    },
    featureContent: {
        flex: 1
    },
    featureLabel: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#ffffff',
        margin: 0,
        marginBottom: '4px',
        letterSpacing: '0.3px'
    },
    featureDescription: {
        fontSize: '12px',
        color: '#666',
        margin: 0,
        lineHeight: '1.5'
    }
};
