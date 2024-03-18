import DeleteButton from "@/components/common/delete-button/delete-button";
import { deleteTeacher } from "@/actions/teacher/delete-teacher";
import EditButton from "@/components/common/edit-button/edit-button";
import styles from "./teacher-management-card.module.scss";

export default function TeacherManagementCard({ data, orderNumber }) {
    const dataToMap = [
        {
            label: "username:",
            value: `${data?.username}`,
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
        {
            label: "Email:",
            value: data?.email,
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
                        href={`/dashboard/manage/teacher/edit/${data?.userId}`}
                    />
                    <form action={deleteTeacher}>
                        <DeleteButton
                            cb={deleteTeacher}
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
            <ul className={styles.cardBody}>
                {dataToMap.map((item, index) => (
                    <li key={index} className={styles.detail}>
                        <span className={styles.detailLabel}>{item.label}</span>
                        <span className={styles.detailValue}>
                            {item.value || "N/A"}
                        </span>
                    </li>
                ))}
                <li
                    className={`${styles.detail} ${
                        data?.advisorTeacher ? styles.success : styles.danger
                    }`}>
                    <span className={styles.detailLabel}>Advisor Teacher</span>
                    <span className={styles.detailValue}>
                        {data?.advisorTeacher ? "Yes" : "No"}
                    </span>
                </li>
            </ul>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
}
