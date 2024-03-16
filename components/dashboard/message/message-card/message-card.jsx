import styles from "./message-card.module.scss";

export default function MessageCard({ data, orderNumber }) {
    return (
        <div className={styles.messageCard}>
            <div className={styles.cardHeader}>
                <h3 className={styles.subject}>{data?.subject}</h3>
                <span className={styles.date}>{data?.date}</span>
            </div>
            <div className={styles.cardBody}>
                <p className={styles.message}>{data?.message}</p>
                <p className={styles.nameEmail}>
                    <span className={styles.name}>{data?.name}</span>
                    <span className={styles.email}>{data?.email}</span>
                </p>
            </div>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
}
