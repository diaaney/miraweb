import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Products() {
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
                    <h1 style={styles.title}>Products</h1>
                    <p style={styles.subtitle}>Premium features and items</p>
                </div>

                <div style={styles.comingSoon}>
                    <div style={styles.badge}>Coming Soon</div>
                    <p style={styles.message}>
                        We're working on bringing you exclusive products and premium features.
                    </p>
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
    comingSoon: {
        textAlign: 'center',
        padding: '80px 40px',
    },
    badge: {
        display: 'inline-block',
        backgroundColor: '#e7f1ff',
        color: '#0d47a1',
        fontSize: '12px',
        fontWeight: '700',
        padding: '6px 12px',
        borderRadius: '6px',
        marginBottom: '16px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    message: {
        fontSize: '16px',
        color: '#6c757d',
        lineHeight: '1.6',
        margin: 0,
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
};
