import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Setup() {
    const router = useRouter();
    const [minecraftUsername, setMinecraftUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [discordData, setDiscordData] = useState(null);

    useEffect(() => {
        // Wait for router to be ready before checking query params
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

            router.push('/success');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!discordData) {
        return (
            <div style={styles.container}>
                <div style={styles.loadingText}>Redirecting to Discord...</div>
            </div>
        );
    }

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
                        <h2 style={styles.cardTitle}>Setup Profile</h2>
                        <p style={styles.cardSubtitle}>Configure your Minecraft profile information</p>
                    </div>

                    {/* Discord Info */}
                    <div style={styles.discordSection}>
                        <div style={styles.discordInfo}>
                            {discordData.avatar && (
                                <img
                                    src={`https://cdn.discordapp.com/avatars/${discordData.discord_id}/${discordData.avatar}.png?size=128`}
                                    alt="Discord Avatar"
                                    style={styles.avatar}
                                />
                            )}
                            <div style={styles.discordDetails}>
                                <div style={styles.discordLabel}>Connected Account</div>
                                <div style={styles.discordUsername}>{discordData.discord_username}</div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>MINECRAFT USERNAME</label>
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
                            <div style={styles.error}>
                                <span style={styles.errorIcon}>⚠</span>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                ...styles.button,
                                ...(loading ? styles.buttonDisabled : {})
                            }}
                        >
                            {loading ? 'CREATING PROFILE...' : 'CREATE PROFILE'}
                        </button>
                    </form>

                    {/* Info Section */}
                    <div style={styles.infoSection}>
                        <div style={styles.infoTitle}>AUTOMATICALLY DETECTED</div>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <div style={styles.infoIcon}>🎮</div>
                                <div style={styles.infoText}>Minecraft Skin</div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoIcon}>⚔️</div>
                                <div style={styles.infoText}>Minemen Club ELO</div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoIcon}>🌍</div>
                                <div style={styles.infoText}>Location Data</div>
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
        maxWidth: '700px',
        width: '100%'
    },
    loadingText: {
        color: '#666',
        fontSize: '14px',
        letterSpacing: '0.5px'
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
    discordSection: {
        padding: '32px 40px',
        borderBottom: '1px solid #1f1f1f'
    },
    discordInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    avatar: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        border: '2px solid #1f1f1f'
    },
    discordDetails: {
        flex: 1
    },
    discordLabel: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#666',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '6px'
    },
    discordUsername: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        letterSpacing: '0.3px'
    },
    form: {
        padding: '40px'
    },
    formGroup: {
        marginBottom: '24px'
    },
    label: {
        display: 'block',
        fontSize: '11px',
        fontWeight: '600',
        color: '#888',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '12px'
    },
    input: {
        width: '100%',
        backgroundColor: '#0a0a0a',
        border: '1px solid #1f1f1f',
        borderRadius: '2px',
        padding: '14px 16px',
        color: '#ffffff',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        fontFamily: 'inherit',
        boxSizing: 'border-box'
    },
    button: {
        width: '100%',
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        borderRadius: '2px',
        padding: '16px 32px',
        fontSize: '12px',
        fontWeight: '700',
        letterSpacing: '1px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textTransform: 'uppercase',
        boxShadow: '0 4px 12px rgba(88, 101, 242, 0.3)',
        marginTop: '8px'
    },
    buttonDisabled: {
        backgroundColor: '#4752c4',
        cursor: 'not-allowed',
        opacity: 0.7
    },
    error: {
        backgroundColor: '#2a1515',
        border: '1px solid #3d1f1f',
        color: '#ff6b6b',
        padding: '14px 16px',
        borderRadius: '2px',
        fontSize: '13px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    errorIcon: {
        fontSize: '16px'
    },
    infoSection: {
        padding: '32px 40px',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid #1f1f1f'
    },
    infoTitle: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#666',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '20px'
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px'
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    infoIcon: {
        fontSize: '20px'
    },
    infoText: {
        fontSize: '13px',
        color: '#888',
        letterSpacing: '0.3px'
    }
};
