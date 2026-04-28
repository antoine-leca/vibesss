const Home = () => {
    return (
        <main style={styles.page}>
            <section style={styles.hero}>
                <h1 style={styles.title}>Bienvenue sur Vibesss</h1>
                <p style={styles.subtitle}>
                    Une page d’accueil simple pour démarrer rapidement votre projet React.
                </p>
                <button style={styles.button}>Commencer</button>
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>À propos</h2>
                <p style={styles.text}>
                    Cette application est un exemple de structure de base avec une mise en page propre.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Fonctionnalités</h2>
                <ul style={styles.list}>
                    <li>Interface claire</li>
                    <li>Composant réutilisable</li>
                    <li>Facile à personnaliser</li>
                </ul>
            </section>

            <footer style={styles.footer}>© {new Date().getFullYear()} Vibesss</footer>
        </main>
    );
};

const styles = {
    page: {
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937",
        backgroundColor: "#f9fafb",
    },
    hero: {
        textAlign: "center",
        padding: "80px 20px",
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        color: "white",
    },
    title: {
        fontSize: "2.5rem",
        marginBottom: "12px",
    },
    subtitle: {
        fontSize: "1.1rem",
        marginBottom: "24px",
    },
    button: {
        border: "none",
        backgroundColor: "white",
        color: "#4f46e5",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    section: {
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px 20px",
    },
    sectionTitle: {
        fontSize: "1.6rem",
        marginBottom: "12px",
    },
    text: {
        lineHeight: 1.6,
    },
    list: {
        lineHeight: 1.8,
        paddingLeft: "20px",
    },
    footer: {
        textAlign: "center",
        padding: "24px",
        borderTop: "1px solid #e5e7eb",
        marginTop: "20px",
        color: "#6b7280",
    },
};

export default Home;