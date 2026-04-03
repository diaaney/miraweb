export default function Success() {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.checkmark}>✓</div>
                <h1 style={styles.title}>Profile Created!</h1>
                <p style={styles.text}>
                    Your profile has been successfully created.
                    You can now use <code style={styles.code}>/profile</code> in Discord to view it!
                </p>
                <p style={styles.subtext}>
                    You can close this window now.
                </p>
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
        padding: '60px 40px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    },
    checkmark: {
        fontSize: '64px',
        color: '#3ba55d',
        marginBottom: '24px'
    },
    title: {
        color: '#fff',
        marginBottom: '16px',
        fontSize: '28px'
    },
    text: {
        color: '#b5bac1',
        fontSize: '16px',
        lineHeight: '1.6',
        marginBottom: '16px'
    },
    subtext: {
        color: '#80848e',
        fontSize: '14px'
    },
    code: {
        backgroundColor: '#1e1f22',
        padding: '2px 6px',
        borderRadius: '3px',
        fontFamily: 'monospace',
        color: '#fff'
    }
};
