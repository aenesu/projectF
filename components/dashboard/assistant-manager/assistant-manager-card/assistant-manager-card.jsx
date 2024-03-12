import EditButton from "@/components/common/edit-button/edit-button";
import styles from "./manager-card.module.scss";
import DeleteButton from "@/components/common/delete-button/delete-button";
import { deleteManager } from "@/actions/manager/delete-manager";

export default function AssistantManagerCard({ data, orderNumber }) {
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
            value: `${data?.birthDay} (${data?.birthPlace})`,
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
                    <EditButton
                        title={`Edit ${data?.name} ${data?.surname}`}
                        href={`/dashboard/manage/manager/edit/${data?.userId}`}
                    />
                    <form action={deleteManager}>
                        <DeleteButton
                            cb={deleteManager}
                            id={data?.userId}
                            title={`Delete ${data?.name} ${data?.surname}`}
                            simple
                            builtIn={data?.built_in}
                            errorText={`There was a problem deleting ${data?.name} ${data?.surname}`}
                            questionText={`Are you sure you want to delete ${data?.name} ${data?.surname}?`}
                            successText={`${data?.name} ${data?.surname} has been deleted successfully!`}
                        />
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
