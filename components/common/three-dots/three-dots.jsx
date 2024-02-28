import styles from "./three-dots.module.scss";

export default function ThreeDots() {
    return (
        <div className={styles.container}>
            {/* {Array.from({ length: 3 }).map((_, index) => (
                <span key={index} className={styles.dot}>
                    .
                </span>
            ))} */}
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
        </div>
    );
}
