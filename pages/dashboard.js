import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
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
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <Layout user={user} onLogout={handleLogout}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Profile</h1>
                    <p style={styles.subtitle}>Manage your gaming identity</p>
                </div>

                <div style={styles.grid}>
                    {/* Profile Card */}
                    <div style={styles.profileCard}>
                        <div style={styles.profileHeader}>
                            {user.skin_url && (
                                <img
                                    src={user.skin_url}
                                    alt="Minecraft Skin"
                                    style={styles.skin}
                                />
                            )}
                            <div style={styles.profileInfo}>
                                <h2 style={styles.profileName}>{user.minecraft_username}</h2>
                                <p style={styles.profileCreated}>
                                    Profile created {new Date(user.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>⚔️</div>
                            <div style={styles.statContent}>
                                <p style={styles.statLabel}>Peak ELO</p>
                                <h3 style={styles.statValue}>{user.peak_elo}</h3>
                            </div>
                        </div>

                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>📊</div>
                            <div style={styles.statContent}>
                                <p style={styles.statLabel}>Current ELO</p>
                                <h3 style={styles.statValue}>{user.current_elo}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Info Card */}
                    <div style={styles.infoCard}>
                        <h3 style={styles.infoTitle}>Account Information</h3>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Discord</span>
                                <span style={styles.infoValue}>{user.discord_username}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Minecraft</span>
                                <span style={styles.infoValue}>{user.minecraft_username}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Location</span>
                                <span style={styles.infoValue}>
                                    {user.city}, {user.state} {user.country_emoji}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

const styles = {
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
    container: {
        maxWidth: '1200px',
    },
    header: {
        marginBottom: '32px',
    },
    title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#ffffff',
        margin: 0,
        marginBottom: '8px',
        letterSpacing: '0.5px',
    },
    subtitle: {
        fontSize: '14px',
        color: '#8b92b8',
        margin: 0,
    },
    grid: {
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    },
    profileCard: {
        backgroundColor: '#0f1535',
        border: '1px solid #1a2142',
        borderRadius: '16px',
        padding: '32px',
        gridColumn: 'span 2',
    },
    profileHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
    },
    skin: {
        width: '96px',
        height: '96px',
        borderRadius: '12px',
        border: '2px solid #1a2142',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#ffffff',
        margin: 0,
        marginBottom: '8px',
        letterSpacing: '0.5px',
    },
    profileCreated: {
        fontSize: '13px',
        color: '#8b92b8',
        margin: 0,
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        gridColumn: 'span 2',
    },
    statCard: {
        backgroundColor: '#0f1535',
        border: '1px solid #1a2142',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    statIcon: {
        fontSize: '32px',
        width: '48px',
        height: '48px',
        backgroundColor: '#1a2142',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statContent: {
        flex: 1,
    },
    statLabel: {
        fontSize: '12px',
        color: '#8b92b8',
        margin: 0,
        marginBottom: '4px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontWeight: '600',
    },
    statValue: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#ffffff',
        margin: 0,
    },
    infoCard: {
        backgroundColor: '#0f1535',
        border: '1px solid #1a2142',
        borderRadius: '16px',
        padding: '32px',
        gridColumn: 'span 2',
    },
    infoTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        margin: 0,
        marginBottom: '24px',
        letterSpacing: '0.3px',
    },
    infoGrid: {
        display: 'grid',
        gap: '16px',
    },
    infoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#0a0e27',
        border: '1px solid #1a2142',
        borderRadius: '12px',
    },
    infoLabel: {
        fontSize: '13px',
        color: '#8b92b8',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: '14px',
        color: '#ffffff',
        fontWeight: '600',
    },
};
