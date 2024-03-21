import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getMeetingsAsStudent } from "@/actions/student/get-meetings-as-student";
import MeetingCard from "@/components/dashboard/student/meeting-card/meeting-card";
import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import styles from "./admin-list.module.scss";

export default async function MeetingList() {
    const data = await getMeetingsAsStudent();
    const isData = data && data?.status !== "error" && data?.length > 0;

    return (
        <div className={styles.container}>
            {isData ? (
                data?.map((item, index) => (
                    <MeetingCard
                        key={index}
                        data={item}
                        orderNumber={calculateOrderNumber(1, 500, index)}
                    />
                ))
            ) : (
                <NoDataAvailable />
            )}
        </div>
    );
}
