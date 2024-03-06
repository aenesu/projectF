import { auth } from "@/auth";
import styles from "./user-information.module.scss";
import Avatar from "@/components/common/avatar/avatar";

export default async function UserInformation() {
    const session = await auth();

    return (
        <div className={styles.container}>
            <Avatar
                title={`${session?.user?.name} ${session?.user?.surname}`}
                rounded
            />
            <div>
                <h3 className={styles.title}>
                    {session?.user?.name} {session?.user?.surname}
                </h3>
                <p className={styles.type}>
                    <span>Account Type:</span>
                    <span>{session?.user?.role}</span>
                </p>
            </div>
        </div>
    );
}
