import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <div style={styles.header}>
                    <h1 style={styles.title}>MIRA</h1>
                    <p style={styles.subtitle}>Profile System</p>
                </div>

                <div style={styles.main}>
                    <h2 style={styles.heading}>Welcome</h2>
                    <p style={styles.description}>
                        Connect your Discord account to create your gaming profile
                    </p>

                    <button onClick={handleLogin} style={styles.button}>
                        Login with Discord
                    </button>

                    <div style={styles.features}>
                        <div style={styles.feature}>
                            <h3 style={styles.featureTitle}>Minecraft</h3>
                            <p style={styles.featureText}>Automatic skin sync</p>
                        </div>
                        <div style={styles.feature}>
                            <h3 style={styles.featureTitle}>ELO Stats</h3>
                            <p style={styles.featureText}>Peak and current rating</p>
                        </div>
                        <div style={styles.feature}>
                            <h3 style={styles.featureTitle}>Location</h3>
                            <p style={styles.featureText}>Geo-detection</p>
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
        backgroundColor: '#f8f9fa',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 20px',
    },
    loadingContainer: {
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '3px solid #e9ecef',
        borderTop: '3px solid '#0d47a1',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    content: {
        maxWidth: '680px',
        width: '100%',
    },
    header: {
        textAlign: 'center',
        marginBottom: '80px',
        paddingTop: '60px',
    },
    title: {
        fontSize: '48px',
        fontWeight: '800',
        color: '#0d47a1',
        margin: 0,
        letterSpacing: '0px',
    },
    subtitle: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#6c757d',
        margin: '8px 0 0 0',
        letterSpacing: '0.5px',
    },
    main: {
        textAlign: 'center',
    },
    heading: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#212529',
        margin: '0 0 16px 0',
    },
    description: {
        fontSize: '16px',
        color: '#6c757d',
        lineHeight: '1.6',
        margin: '0 0 40px 0',
        maxWidth: '480px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: {
        backgroundColor: '#0d47a1',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        padding: '16px 32px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        marginBottom: '60px',
    },
    features: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '24px',
        marginTop: '60px',
    },
    feature: {
        textAlign: 'center',
        padding: '24px',
    },
    featureTitle: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#212529',
        margin: '0 0 8px 0',
    },
    featureText: {
        fontSize: '14px',
        color: '#6c757d',
        margin: 0,
        lineHeight: '1.5',
    },
};
