import DeleteButton from "@/components/common/delete-button/delete-button";
import { deleteStudent } from "@/actions/student/delete-student";
import EditButton from "@/components/common/edit-button/edit-button";
import styles from "./student-management-card.module.scss";

export default function StudentManagementCard({ data, orderNumber }) {
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
        {
            label: "Email:",
            value: data?.email,
        },
        {
            label: "Student Number:",
            value: data?.studentNumber,
        },
        {
            label: "Advisor:",
            value: `${data?.advisorTeacherName} ${data?.advisorTeacherSurname}`,
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
                        href={`/dashboard/manage/student/edit/${data?.id}`}
                    />
                    <form action={deleteStudent}>
                        <DeleteButton
                            cb={deleteStudent}
                            id={data?.id}
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
            </ul>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
}
