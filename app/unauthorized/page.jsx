import Image from "next/image";
import { auth } from "@/auth";
import Gandalf from "@/public/assets/images/unauthorized.png";
import Link from "next/link";
import styles from "./unauthorized-page.module.scss";

export default async function UnauthorizedPage() {
    const session = await auth();

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
                <h1 className={styles.title}>You shall not pass!</h1>
                <p className={styles.description}>
                    This page is beyond any of you.
                </p>
                {session?.user?.role === "ADMIN" && (
                    <p className={styles.description}>
                        For even the very authorized cannot see all pages.
                    </p>
                )}
            </div>
            <Image
                src={Gandalf}
                alt="Gandalf showing his hand to stop you from passing through"
                className={styles.image}
                title="Gandalf"
            />
            <Link
                href="/dashboard"
                className={styles.back}
                title="Fly Back To Safety!">
                Fly Back To Safety!
            </Link>
        </div>
    );
}
