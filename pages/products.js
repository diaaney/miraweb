import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Products() {
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
                <div style={styles.comingSoonCard}>
                    <div style={styles.iconContainer}>
                        <span style={styles.icon}>🛍️</span>
                    </div>
                    <h1 style={styles.title}>Products</h1>
                    <div style={styles.badge}>COMING SOON</div>
                    <p style={styles.description}>
                        We're working on something amazing. Premium products and features will be available here soon.
                    </p>
                    <div style={styles.features}>
                        <div style={styles.featureItem}>
                            <span style={styles.featureIcon}>✨</span>
                            <span style={styles.featureText}>Exclusive Items</span>
                        </div>
                        <div style={styles.featureItem}>
                            <span style={styles.featureIcon}>🎁</span>
                            <span style={styles.featureText}>Special Perks</span>
                        </div>
                        <div style={styles.featureItem}>
                            <span style={styles.featureIcon}>🚀</span>
                            <span style={styles.featureText}>Early Access</span>
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
        maxWidth: '600px',
        margin: '80px auto',
        padding: '20px',
    },
    comingSoonCard: {
        backgroundColor: '#0f1535',
        border: '1px solid #1a2142',
        borderRadius: '16px',
        padding: '64px 48px',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    iconContainer: {
        marginBottom: '24px',
    },
    icon: {
        fontSize: '64px',
        display: 'inline-block',
        animation: 'float 3s ease-in-out infinite',
    },
    title: {
        fontSize: '40px',
        fontWeight: '800',
        color: '#ffffff',
        margin: 0,
        marginBottom: '16px',
        letterSpacing: '1px',
    },
    badge: {
        display: 'inline-block',
        backgroundColor: '#5865f2',
        color: '#ffffff',
        fontSize: '11px',
        fontWeight: '700',
        padding: '6px 16px',
        borderRadius: '8px',
        letterSpacing: '1px',
        marginBottom: '24px',
    },
    description: {
        fontSize: '15px',
        color: '#8b92b8',
        lineHeight: '1.8',
        marginBottom: '40px',
        maxWidth: '400px',
        margin: '0 auto 40px',
    },
    features: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '300px',
        margin: '0 auto',
    },
    featureItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#0a0e27',
        border: '1px solid #1a2142',
        borderRadius: '12px',
    },
    featureIcon: {
        fontSize: '20px',
    },
    featureText: {
        fontSize: '14px',
        color: '#ffffff',
        fontWeight: '500',
        letterSpacing: '0.3px',
    },
};
