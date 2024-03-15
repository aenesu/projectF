import DeleteButton from "@/components/common/delete-button/delete-button";
import { deleteLesson } from "@/actions/lesson/delete-lesson";
import styles from "./lesson-management-card.module.scss";

export default function LessonManagementCard({ data, orderNumber }) {
    return (
        <div className={styles.cardContainer}>
            <form action={deleteLesson} className={styles.deleteContainer}>
                <DeleteButton
                    cb={deleteLesson}
                    id={data?.lessonId}
                    title={`Delete ${data?.lessonName}`}
                    simple
                    errorText={`There was a problem deleting ${data?.lessonName}`}
                    questionText={`Are you sure you want to delete ${data?.lessonName}?`}
                    successText={`${data?.lessonName} has been deleted successfully!`}
                />
            </form>
            <h2 className={styles.lessonName}>{data?.lessonName}</h2>
            <p className={styles.item}>ID: {data?.lessonId}</p>
            <p className={styles.item}>Credits: {data?.creditScore}</p>
            <p
                className={`${styles.compulsory} ${
                    data?.compulsory ? styles.danger : styles.success
                }`}>
                {data?.compulsory ? "Compulsory" : "Optional"}
            </p>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
}
