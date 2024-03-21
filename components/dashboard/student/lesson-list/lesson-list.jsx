import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getLessonProgramsAsStudent } from "@/actions/student/get-lesson-programs-as-student";
import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import styles from "./admin-list.module.scss";
import LessonProgramManagementCard from "@/components/dashboard/lesson-program-management/lesson-program-management-card/lesson-program-management-card";

export default async function LessonList() {
    const data = await getLessonProgramsAsStudent();
    const isData = data && data?.status !== "error" && data?.length > 0;

    return (
        <div className={styles.container}>
            {isData ? (
                <div className={styles.cardsContainer}>
                    {data?.map((item, index) => (
                        <LessonProgramManagementCard
                            key={index}
                            data={item}
                            orderNumber={calculateOrderNumber(1, 500, index)}
                        />
                    ))}
                </div>
            ) : (
                <NoDataAvailable />
            )}
        </div>
    );
}
