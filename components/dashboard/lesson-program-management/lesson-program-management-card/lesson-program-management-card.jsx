import DeleteButton from "@/components/common/delete-button/delete-button";
import { deleteLessonProgram } from "@/actions/lesson-program/delete-lesson-program";
import { formatTime } from "@/utils/functions/format-time";
import styles from "./lesson-management-card.module.scss";

export default function LessonProgramManagementCard({
    authorized,
    data,
    orderNumber,
}) {
    console.log(data);
    return (
        <div className={styles.cardContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    Lesson Program - {data?.lessonProgramId}
                </h2>
                {authorized && (
                    <form
                        action={deleteLessonProgram}
                        className={styles.deleteContainer}>
                        <DeleteButton
                            cb={deleteLessonProgram}
                            id={data?.lessonProgramId}
                            title={`Delete Lesson Program - ${data?.lessonProgramId}`}
                            simple
                            errorText={`There was a problem deleting Lesson Program - ${data?.lessonProgramId}`}
                            questionText={`Are you sure you want to delete Lesson Program - ${data?.lessonProgramId}?`}
                            successText={`Lesson Program - ${data?.lessonProgramId} has been deleted successfully!`}
                        />
                    </form>
                )}
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.classInfo}>
                    <div className={styles.day}>
                        <span>Day:</span>
                        <span>{data?.day}</span>
                    </div>
                    <div className={styles.time}>
                        {formatTime(data?.startTime)} -{" "}
                        {formatTime(data?.stopTime)}
                    </div>
                </div>
                <ul className={styles.lessonList}>
                    {data?.lessonName &&
                        data?.lessonName.map((item) => (
                            <li
                                key={item.lessonId}
                                className={styles.lessonItem}>
                                <span>{item.lessonName}</span>
                                <span>(Credits: {item.creditScore})</span>
                            </li>
                        ))}
                </ul>
            </div>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
}
