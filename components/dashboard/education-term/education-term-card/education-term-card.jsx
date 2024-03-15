import DeleteButton from "@/components/common/delete-button/delete-button";
import moment from "moment";
import { compareDateWithToday } from "@/utils/functions/compare-date-with-today";
import { deleteEducationTerm } from "@/actions/education-term/delete-education-term";
import styles from "./education-term-card.module.scss";

export default function EducationTermCard({ authorized, data, orderNumber }) {
    return (
        <div
            className={`${styles.cardContainer} ${
                styles[compareDateWithToday(data?.lastRegistrationDate)]
            }`}>
            {authorized && (
                <form
                    action={deleteEducationTerm}
                    className={styles.deleteContainer}>
                    <DeleteButton
                        cb={deleteEducationTerm}
                        id={data?.id}
                        title={`Delete ${data?.term} ${data?.id}`}
                        simple
                        builtIn={data?.built_in}
                        errorText={`There was a problem deleting ${data?.term} ${data?.id}`}
                        questionText={`Are you sure you want to delete ${data?.term} ${data?.id}?`}
                        successText={`${data?.term} ${data?.id} has been deleted successfully!`}
                    />
                </form>
            )}
            <h2 className={styles.term}>
                {data?.term} - {data?.id}
            </h2>
            <p className={styles.item}>
                Start Date: {moment(data?.startDate).format("LL")}
            </p>
            <p className={styles.item}>
                End Date: {moment(data?.endDate).format("LL")}
            </p>
            <p className={`${styles.item} ${styles.last}`}>
                <span>Last Registration Date: </span>
                <span>{moment(data?.lastRegistrationDate).format("LL")}</span>
            </p>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
}
