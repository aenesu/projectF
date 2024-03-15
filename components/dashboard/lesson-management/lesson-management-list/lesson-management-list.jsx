import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import Pagination from "@/components/common/pagination/pagination";
import { getLessonsByPage } from "@/actions/lesson/get-lessons-by-page";
import LessonManagementCard from "@/components/dashboard/lesson-management/lesson-management-card/lesson-management-card";
import styles from "./admin-list.module.scss";

export default async function LessonManagementList({ page, size, sort, type }) {
    const data = await getLessonsByPage(page - 1, size, sort, type);
    const isData =
        data && data?.status !== "error" && data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isData ? (
                    data?.content?.map((item, index) => (
                        <LessonManagementCard
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
                baseUrl="/dashboard/manage/lesson"
                currentPage={+page}
                size={size}
                totalPages={data?.totalPages}
            />
        </div>
    );
}
