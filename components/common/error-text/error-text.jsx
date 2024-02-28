import styles from "./error-text.module.scss";

export default function ErrorText({ text }) {
    return (
        <div className={styles.container}>
            <p className={styles.text}>{text}</p>
        </div>
    );
}
