import { auth } from "@/auth";
import styles from "./dashboard-banner.module.scss";
import Image from "next/image";
import Banner from "@/public/assets/images/dashboard-banner-cut.png";
import moment from "moment";

export default async function DashboardBanner() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.content}>

        <div className={styles.date}>
          <span>{moment().format("LL")}</span>
          <span>{moment().format("dddd")}</span>
        </div>

        <div>
          <h1 className={styles.title}>
            Welcome to your dashboard, {session?.user?.name}{" "}
            {session?.user?.surname}
          </h1>
          <p className={styles.description}>
            Here you can view your recent activity, manage your
            account, and more.
          </p>
        </div>

      </div>

      <div className={styles.imageContainer}>
        <Image
          alt="Dashboard Banner"
          className={styles.image}
          quality={100}
          priority
          src={Banner}
        />
      </div>
      
    </div>
  );
}
