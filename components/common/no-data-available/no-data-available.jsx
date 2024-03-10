import styles from "./no-data-available.module.scss";

export default function NoDataAvailable() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <p className={styles.text}>No data available...</p>
            </div>
        </div>
    );
}
