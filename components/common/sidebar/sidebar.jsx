import { auth } from "@/auth";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import IconGraduation from "@/public/assets/images/icon-graduation.svg";
import SidebarLinks from "@/components/common/sidebar-links/sidebar-links";
import LogoutButton from "@/components/common/logout-button/logout-button";

export default async function Sidebar() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarInnerContainer}>
          <Image
            src={IconGraduation}
            alt="Graduation Cap Icon"
            className={styles.avatar}
          />
        </div>
      </div>
      <div className={styles.linksContainer}>
        <SidebarLinks role={session.user.role} />
      </div>
      <div className={styles.logoutContainer}>
        <LogoutButton />
      </div>
    </div>
  );
}
