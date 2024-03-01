import Image from "next/image";
import Loki from "@/public/assets/images/not-found.png";
import styles from "./not-found.module.scss";

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.blob}></div>
            <div className={styles.blob}></div>
            <div className={styles.blob}></div>
            <div className={styles.blob}></div>
            <div className={styles.blob}></div>
            <div className={styles.blob}></div>
            <div className={styles.blob}></div>
            <div className={styles.blob}></div>
            <div className={styles.contentContainer}>
                <h1 className={styles.title}>
                    Oops! I have never seen this page in my life before!
                </h1>
                <p className={styles.description}>
                    If you think there is a mistake, please pray to the gods of
                    the Asgard and try again.
                </p>
            </div>
            <Image
                src={Loki}
                alt="Loki thinking..."
                className={styles.image}
                title="Loki thinking..."
            />
        </div>
    );
}
