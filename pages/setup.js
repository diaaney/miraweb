import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
                    <h2 style={styles.heading}>Setup Profile</h2>
                    <p style={styles.description}>
                        Configure your Minecraft profile information
                    </p>

                    {discordData.avatar && (
                        <div style={styles.discordSection}>
                            <img
                                src={`https://cdn.discordapp.com/avatars/${discordData.discord_id}/${discordData.avatar}.png?size=128`}
                                alt="Discord Avatar"
                                style={styles.avatar}
                            />
                            <div>
                                <p style={styles.label}>Connected Account</p>
                                <p style={styles.discordName}>{discordData.discord_username}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label style={styles.inputLabel}>Minecraft Username</label>
                            <input
                                type="text"
                                value={minecraftUsername}
                                onChange={(e) => setMinecraftUsername(e.target.value)}
                                placeholder="Enter your Minecraft username"
                                required
                                style={styles.input}
                            />
                        </div>

                        {error && (
                            <div style={styles.error}>{error}</div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                ...styles.button,
                                ...(loading ? styles.buttonDisabled : {})
                            }}
                        >
                            {loading ? 'Creating Profile...' : 'Create Profile'}
                        </button>
                    </form>

                    <div style={styles.features}>
                        <p style={styles.featuresTitle}>Automatically Detected</p>
                        <div style={styles.featuresList}>
                            <span style={styles.featureItem}>Minecraft Skin</span>
                            <span style={styles.featureDot}>•</span>
                            <span style={styles.featureItem}>Minemen Club ELO</span>
                            <span style={styles.featureDot}>•</span>
                            <span style={styles.featureItem}>Location Data</span>
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
        borderTop: '3px solid #0d47a1',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    content: {
        maxWidth: '560px',
        width: '100%',
    },
    header: {
        textAlign: 'center',
        marginBottom: '60px',
        paddingTop: '60px',
    },
    title: {
        fontSize: '48px',
        fontWeight: '800',
        color: '#0d47a1',
        margin: 0,
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
        fontSize: '28px',
        fontWeight: '700',
        color: '#212529',
        margin: '0 0 12px 0',
    },
    description: {
        fontSize: '16px',
        color: '#6c757d',
        lineHeight: '1.6',
        margin: '0 0 32px 0',
    },
    discordSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '20px',
        backgroundColor: '#ffffff',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        marginBottom: '32px',
        textAlign: 'left',
    },
    avatar: {
        width: '56px',
        height: '56px',
        borderRadius: '8px',
    },
    label: {
        fontSize: '12px',
        color: '#6c757d',
        margin: '0 0 4px 0',
        fontWeight: '500',
    },
    discordName: {
        fontSize: '15px',
        color: '#212529',
        margin: 0,
        fontWeight: '600',
    },
    form: {
        marginBottom: '40px',
    },
    formGroup: {
        marginBottom: '24px',
        textAlign: 'left',
    },
    inputLabel: {
        display: 'block',
        fontSize: '13px',
        fontWeight: '600',
        color: '#212529',
        marginBottom: '8px',
    },
    input: {
        width: '100%',
        backgroundColor: '#ffffff',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '15px',
        color: '#212529',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        fontFamily: 'inherit',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        backgroundColor: '#0d47a1',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        padding: '14px 28px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    },
    buttonDisabled: {
        backgroundColor: '#6c9bcf',
        cursor: 'not-allowed',
    },
    error: {
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        color: '#c33',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '14px',
        marginBottom: '16px',
    },
    features: {
        paddingTop: '32px',
        borderTop: '1px solid #e9ecef',
    },
    featuresTitle: {
        fontSize: '12px',
        fontWeight: '600',
        color: '#6c757d',
        margin: '0 0 12px 0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    featuresList: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
    },
    featureItem: {
        fontSize: '14px',
        color: '#495057',
    },
    featureDot: {
        color: '#dee2e6',
    },
};
