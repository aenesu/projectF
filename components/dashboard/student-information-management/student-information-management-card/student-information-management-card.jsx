import moment from "moment";
import DeleteButton from "@/components/common/delete-button/delete-button";
import { deleteStudentInformation } from "@/actions/student-information/delete-student-information";
import EditButton from "@/components/common/edit-button/edit-button";
import { isPassingLetterGrade } from "@/utils/functions/is-passing-letter-grade";
import { isPassingNumberGrade } from "@/utils/functions/is-passing-number-grade";
import styles from "./student-information-management-card.module.scss";

export default function StudentInformationManagementCard({
    authorized,
    data,
    orderNumber,
}) {
    const dataToMap = [
        {
            label: "Midterm Exam:",
            style: isPassingNumberGrade(data?.midtermExam)
                ? styles.success
                : styles.danger,
            value: data?.midtermExam,
        },
        {
            label: "Final Exam:",
            style: isPassingNumberGrade(data?.finalExam)
                ? styles.success
                : styles.danger,
            value: data?.finalExam,
        },
        {
            label: "Average:",
            style: isPassingNumberGrade(data?.average)
                ? styles.success
                : styles.danger,
            value: data?.average ? data?.average.toFixed(1) : "N/A",
        },
        {
            label: "Absentee:",
            style: styles.danger,
            value: data?.absentee,
        },
        {
            label: "Letter Grade:",
            style: isPassingLetterGrade(data?.note)
                ? styles.success
                : styles.danger,
            value: data?.note,
        },
        {
            label: "Info Note:",
            style: "",
            value: data?.infoNote,
        },
        {
            label: "Lesson:",
            style: styles.lessonName,
            value: data?.lessonName,
        },
        {
            label: "Birth Date:",
            style: "",
            value:
                data?.studentResponse?.birthDay &&
                moment(data?.studentResponse?.birthDay).format("LL"),
        },
        {
            label: "Contact:",
            style: "",
            value: data?.studentResponse?.phoneNumber,
        },
        {
            label: "Email:",
            style: styles.email,
            value: data?.studentResponse?.email,
        },
    ];

    return (
        <div
            className={`${styles.cardContainer} ${
                data?.built_in ? styles.builtIn : ""
            } ${isPassingNumberGrade(data?.average) ? "" : styles.bgDanger}`}>
            <h3 className={styles.cardHeader}>
                Meeting with {data?.teacherName}
                {authorized && (
                    <div className={styles.buttonsContainer}>
                        <EditButton
                            title={`Edit ${data?.studentResponse?.name} ${data?.studentResponse?.surname}`}
                            href={`/dashboard/manage/student-information/edit/${data?.id}`}
                        />
                        <form action={deleteStudentInformation}>
                            <DeleteButton
                                cb={deleteStudentInformation}
                                id={data?.id}
                                title={`Delete ${data?.studentResponse?.name} ${data?.studentResponse?.surname}`}
                                simple
                                builtIn={data?.built_in}
                                errorText={`There was a problem deleting ${data?.studentResponse?.name} ${data?.studentResponse?.surname}`}
                                questionText={`Are you sure you want to delete ${data?.studentResponse?.name} ${data?.studentResponse?.surname}?`}
                                successText={`${data?.studentResponse?.name} ${data?.studentResponse?.surname} has been deleted successfully!`}
                            />
                        </form>
                    </div>
                )}
            </h3>
            <ul className={styles.cardBody}>
                {dataToMap.map((item, index) => (
                    <li
                        key={index}
                        className={`${styles.cardItem} ${item.style}`}>
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                    </li>
                ))}
            </ul>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
}
