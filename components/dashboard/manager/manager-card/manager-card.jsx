import EditButton from "@/components/common/edit-button/edit-button";
import styles from "./manager-card.module.scss";
import DeleteButton from "@/components/common/delete-button/delete-button";

export default function ManagerCard({ data, orderNumber }) {
    const dataToMap = [
        {
            label: "Full Name:",
            value: `${data?.name} ${data?.surname}`,
        },
        {
            label: "SSN:",
            value: data?.ssn,
        },
        {
            label: "Birthday:",
            value: `${data?.birthday} (${data?.birthPlace})`,
        },
        {
            label: "Phone:",
            value: data?.phoneNumber,
        },
        {
            label: "Gender:",
            value: data?.gender,
        },
    ];

    return (
        <div
            className={`${styles.cardContainer} ${
                data?.built_in ? styles.builtIn : ""
            }`}>
            <div className={styles.cardHeader}>
                @{data?.username}
                <div className={styles.buttonsContainer}>
                    <EditButton />
                    <form action="">
                        <DeleteButton />
                    </form>
                </div>
            </div>
            <div className={styles.cardBody}>
                {dataToMap.map((item, index) => (
                    <div key={index} className={styles.detail}>
                        <span className={styles.detailLabel}>{item.label}</span>
                        <span className={styles.detailValue}>
                            {item.value || "N/A"}
                        </span>
                    </div>
                ))}
            </div>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
}
