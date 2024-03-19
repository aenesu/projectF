import DeleteButton from "@/components/common/delete-button/delete-button";
import { deleteMeeting } from "@/actions/meeting/delete-meeting";
import EditButton from "@/components/common/edit-button/edit-button";
import { formatTime } from "@/utils/functions/format-time";
import styles from "./meeting-management-card.module.scss";

export default function MeetingManagementCard({ data, orderNumber }) {
    return (
        <div
            className={`${styles.cardContainer} ${
                data?.built_in ? styles.builtIn : ""
            }`}>
            <div className={styles.cardHeader}>
                <h2>Meeting with {data?.teacherName}</h2>
                <div className={styles.buttonsContainer}>
                    <EditButton
                        title={`Edit Meeting - ${data?.id}`}
                        href={`/dashboard/manage/meeting/edit/${data?.id}`}
                    />
                    <form action={deleteMeeting}>
                        <DeleteButton
                            cb={deleteMeeting}
                            id={data?.id}
                            title={`Delete Meeting - ${data?.id}`}
                            simple
                            builtIn={data?.built_in}
                            errorText={`There was a problem deleting Meeting - ${data?.id}`}
                            questionText={`Are you sure you want to delete Meeting - ${data?.id}?`}
                            successText={`Meeting - ${data?.id} has been deleted successfully!`}
                        />
                    </form>
                </div>
            </div>
            <div className={styles.cardBody}>
                <p className={styles.description}>
                    <strong>Description:</strong> {data?.description}
                </p>
                <div className={styles.students}>
                    <h3>Participants</h3>
                    <div className={styles.studentList}>
                        {data?.students?.map((item, index) => (
                            <p key={index}>
                                {item.name} {item.surname}
                            </p>
                        ))}
                    </div>
                </div>
                <div className={styles.dateTime}>
                    <p className={styles.time}>
                        {formatTime(data?.startTime)} -{" "}
                        {formatTime(data?.stopTime)}
                    </p>
                    <p className={styles.date}>Data: {data?.date}</p>
                </div>
            </div>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
}