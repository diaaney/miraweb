import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Dashboard() {
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
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <Layout user={user} onLogout={handleLogout}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Profile</h1>
                    <p style={styles.subtitle}>Your gaming identity</p>
                </div>

                <div style={styles.section}>
                    <div style={styles.profileHeader}>
                        {user.skin_url && (
                            <img
                                src={user.skin_url}
                                alt="Minecraft Skin"
                                style={styles.avatar}
                            />
                        )}
                        <div>
                            <h2 style={styles.name}>{user.minecraft_username}</h2>
                            <p style={styles.date}>
                                Joined {new Date(user.created_at).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Statistics</h3>
                    <div style={styles.statsGrid}>
                        <div style={styles.statBox}>
                            <p style={styles.statLabel}>Peak ELO</p>
                            <p style={styles.statValue}>{user.peak_elo}</p>
                        </div>
                        <div style={styles.statBox}>
                            <p style={styles.statLabel}>Current ELO</p>
                            <p style={styles.statValue}>{user.current_elo}</p>
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Information</h3>
                    <div style={styles.infoList}>
                        <div style={styles.infoRow}>
                            <span style={styles.infoLabel}>Discord</span>
                            <span style={styles.infoValue}>{user.discord_username}</span>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.infoLabel}>Minecraft</span>
                            <span style={styles.infoValue}>{user.minecraft_username}</span>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.infoLabel}>Location</span>
                            <span style={styles.infoValue}>
                                {user.city}, {user.state} • {user.country}
                            </span>
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
    container: {
        maxWidth: '680px',
    },
    header: {
        marginBottom: '48px',
    },
    title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#212529',
        margin: '0 0 8px 0',
    },
    subtitle: {
        fontSize: '16px',
        color: '#6c757d',
        margin: 0,
    },
    section: {
        marginBottom: '40px',
    },
    profileHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
    },
    name: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#212529',
        margin: '0 0 4px 0',
    },
    date: {
        fontSize: '14px',
        color: '#6c757d',
        margin: 0,
    },
    sectionTitle: {
        fontSize: '14px',
        fontWeight: '700',
        color: '#212529',
        margin: '0 0 16px 0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
    },
    statBox: {
        padding: '24px',
        backgroundColor: '#ffffff',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
    },
    statLabel: {
        fontSize: '13px',
        color: '#6c757d',
        margin: '0 0 8px 0',
        fontWeight: '500',
    },
    statValue: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#212529',
        margin: 0,
    },
    infoList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px 20px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e9ecef',
    },
    infoLabel: {
        fontSize: '14px',
        color: '#6c757d',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: '14px',
        color: '#212529',
        fontWeight: '600',
    },
};
