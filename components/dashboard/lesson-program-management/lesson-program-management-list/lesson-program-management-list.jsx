import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getLessonProgramsByPage } from "@/actions/lesson-program/get-lesson-programs-by-page";
import Pagination from "@/components/common/pagination/pagination";
import LessonProgramManagementCard from "@/components/dashboard/lesson-program-management/lesson-program-management-card/lesson-program-management-card";
import styles from "./admin-list.module.scss";

export default async function LessonProgramManagementList({
    page,
    size,
    sort,
    type,
}) {
    const data = await getLessonProgramsByPage(page - 1, size, sort, type);
    const isData =
        data && data?.status !== "error" && data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isData ? (
                    data?.content?.map((item, index) => (
                        <LessonProgramManagementCard
                            authorized={true}
                            key={index}
                            data={item}
                            orderNumber={calculateOrderNumber(
                                page,
                                size,
                                index
                            )}
                        />
                    ))
                ) : (
                    <NoDataAvailable />
                )}
            </div>
            <hr className={styles.hr} />
            <Pagination
                baseUrl="/dashboard/manage/lesson-program"
                currentPage={+page}
                size={size}
                totalPages={data?.totalPages}
            />
        </div>
    );
}
