export default function Success() {
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
                    <div style={styles.successIcon}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#3ba55d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <div style={styles.cardContent}>
                        <h2 style={styles.title}>Profile Created</h2>
                        <p style={styles.description}>
                            Your profile has been successfully created and is now active.
                        </p>

                        <div style={styles.infoBox}>
                            <div style={styles.infoLabel}>NEXT STEPS</div>
                            <div style={styles.infoText}>
                                Return to Discord and use the <code style={styles.code}>/profile</code> command to view your profile
                            </div>
                        </div>

                        <div style={styles.actions}>
                            <div style={styles.note}>You can close this window now</div>
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
        maxWidth: '600px',
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
    successIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '48px 0 32px 0',
        borderBottom: '1px solid #1f1f1f'
    },
    cardContent: {
        padding: '40px'
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#ffffff',
        margin: 0,
        marginBottom: '12px',
        letterSpacing: '0.5px',
        textAlign: 'center'
    },
    description: {
        fontSize: '14px',
        color: '#888',
        margin: 0,
        marginBottom: '32px',
        lineHeight: '1.6',
        textAlign: 'center'
    },
    infoBox: {
        backgroundColor: '#0a0a0a',
        border: '1px solid #1f1f1f',
        borderRadius: '2px',
        padding: '24px',
        marginBottom: '32px'
    },
    infoLabel: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#666',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '12px'
    },
    infoText: {
        fontSize: '13px',
        color: '#aaa',
        lineHeight: '1.6',
        letterSpacing: '0.3px'
    },
    code: {
        backgroundColor: '#1f1f1f',
        color: '#fff',
        padding: '2px 8px',
        borderRadius: '2px',
        fontFamily: 'monospace',
        fontSize: '13px',
        fontWeight: '600'
    },
    actions: {
        textAlign: 'center'
    },
    note: {
        fontSize: '12px',
        color: '#555',
        letterSpacing: '0.3px'
    }
};
