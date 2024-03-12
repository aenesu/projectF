import styles from "./loader-ring.module.scss";

export default function LoaderRing({ text }) {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.heading}>{text}</div>
            </div>
        </div>
    );
}
