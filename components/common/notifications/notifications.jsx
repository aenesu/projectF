import { IoIosNotifications } from "react-icons/io";
import styles from "./notifications.module.scss";

export default function Notifications() {
    const count = 3;

    return (
        <div
            className={styles.notification}
            title={`You have ${count} notifications`}>
            <IoIosNotifications className={styles.icon} />
            {count > 0 && <span className={styles.badge}>{count}</span>}
        </div>
    );
}
