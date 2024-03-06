import Links from "@/components/common/links/links";
import { Suspense } from "react";
import UserInformation from "@/components/dashboard/user-information/user-information";
import Notifications from "@/components/common/notifications/notifications";
import UserInformationSkeleton from "@/components/dashboard/user-information/user-information-skeleton";
import DashboardBanner from "@/components/dashboard/dashboard-banner/dashboard-banner";
import styles from "./dashboard-page.module.scss";


export default function DashboardPage() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.topbarContainer}>
        <Links />
        <div className={styles.informationContainer}>
          <Suspense fallback={<UserInformationSkeleton />}>
            <UserInformation />
          </Suspense>
          <Suspense>
            <Notifications />
          </Suspense>
        </div>
      </div>
      <DashboardBanner />
      <div className={styles.contentContainer}>
        <div className={`${styles.content} ${styles.contentOne}`}>
          CONTENT 1
        </div>
        <div className={styles.content}>CONTENT 2</div>
      </div>
    </div>
  );
}
