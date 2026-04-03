import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Setup() {
    const router = useRouter();
    const [minecraftUsername, setMinecraftUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [discordData, setDiscordData] = useState(null);

    useEffect(() => {
        // Get Discord data from URL params
        const { discord_id, discord_username, avatar } = router.query;

        if (!discord_id) {
            // Redirect to Discord OAuth if no data
            window.location.href = process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL;
            return;
        }

        setDiscordData({
            discord_id,
            discord_username,
            avatar
        });
    }, [router.query]);

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

            // Success! Redirect to success page
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
                <p>Redirecting to Discord...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Setup Your Profile</h1>

                <div style={styles.discordInfo}>
                    {discordData.avatar && (
                        <img
                            src={`https://cdn.discordapp.com/avatars/${discordData.discord_id}/${discordData.avatar}.png?size=128`}
                            alt="Discord Avatar"
                            style={styles.avatar}
                        />
                    )}
                    <p style={styles.username}>{discordData.discord_username}</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>
                        Minecraft Username
                        <input
                            type="text"
                            value={minecraftUsername}
                            onChange={(e) => setMinecraftUsername(e.target.value)}
                            placeholder="Enter your Minecraft username"
                            required
                            style={styles.input}
                        />
                    </label>

                    {error && (
                        <div style={styles.error}>
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
                        {loading ? 'Creating Profile...' : 'Create Profile'}
                    </button>
                </form>

                <div style={styles.info}>
                    <p style={styles.infoText}>
                        We'll automatically fetch:
                    </p>
                    <ul style={styles.list}>
                        <li>Your Minecraft skin</li>
                        <li>Your Minemen Club ELO</li>
                        <li>Your location (City, State, Country)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2b2d31',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '20px'
    },
    card: {
        backgroundColor: '#393A41',
        borderRadius: '8px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    },
    title: {
        color: '#fff',
        marginBottom: '24px',
        fontSize: '28px',
        textAlign: 'center'
    },
    discordInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '32px'
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        marginBottom: '12px'
    },
    username: {
        color: '#fff',
        fontSize: '18px',
        margin: 0
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    label: {
        color: '#b5bac1',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    input: {
        backgroundColor: '#1e1f22',
        border: 'none',
        borderRadius: '4px',
        padding: '12px',
        color: '#fff',
        fontSize: '16px',
        outline: 'none'
    },
    button: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    buttonDisabled: {
        backgroundColor: '#4752c4',
        cursor: 'not-allowed'
    },
    error: {
        backgroundColor: '#ed4245',
        color: '#fff',
        padding: '12px',
        borderRadius: '4px',
        fontSize: '14px'
    },
    info: {
        marginTop: '32px',
        padding: '16px',
        backgroundColor: '#2b2d31',
        borderRadius: '4px'
    },
    infoText: {
        color: '#b5bac1',
        fontSize: '14px',
        margin: '0 0 8px 0'
    },
    list: {
        color: '#b5bac1',
        fontSize: '14px',
        margin: '0',
        paddingLeft: '20px'
    }
};
