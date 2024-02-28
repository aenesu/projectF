import styles from "./auth-layout.module.scss";

export default function AuthLayout({ children }) {
    return (
        <div className={styles.container}>
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.blob}></div>
            ))}
            <div className={styles.contentContainer}>
                <h1 className={styles.title}>
                    Edvance Your Learning: <br /> Gateway to Growth
                </h1>
                <p className={styles.description}>
                    Sign in to explore a realm of resources, track your
                    educational progress, and connect with your courses and
                    peers.
                </p>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}
