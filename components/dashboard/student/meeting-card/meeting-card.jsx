import { compareDateWithToday } from "@/utils/functions/compare-date-with-today";
import styles from "./meeting-card.module.scss";
import moment from "moment";
import { formatTime } from "@/utils/functions/format-time";

export default function MeetingCard({ data, orderNumber }) {
    return (
        <div className={styles.cardContainer}>
            <h3 className={styles.cardHeader}>{data?.description}</h3>
            <div className={styles.cardBody}>
                <div
                    className={`${styles.cardItem} ${
                        styles[compareDateWithToday(data?.date)]
                    }`}>
                    <p className={styles.date}>
                        {moment(data?.date).format("dddd, MMMM Do, YYYY")}
                    </p>
                    <p className={styles.time}>
                        {formatTime(data?.startTime)} -{" "}
                        {formatTime(data?.stopTime)}
                    </p>
                </div>
                <p className={styles.cardItem}>Advisor: {data?.teacherName}</p>
                <p className={styles.cardItem}>
                    Students: {data?.students?.length}
                </p>
            </div>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
}
