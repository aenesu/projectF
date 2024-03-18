import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getTeachersByPage } from "@/actions/teacher/get-teachers-by-page";
import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import Pagination from "@/components/common/pagination/pagination";
import TeacherManagementCard from "@/components/dashboard/teacher-management/teacher-management-card/teacher-management-card";
import styles from "./admin-list.module.scss";

export default async function TeacherManagementList({
    page,
    size,
    sort,
    type,
}) {
    const data = await getTeachersByPage(page - 1, size, sort, type);
    const isData =
        data && data?.status !== "error" && data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isData ? (
                    data?.content?.map((item, index) => (
                        <TeacherManagementCard
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
                baseUrl="/dashboard/manage/teacher"
                currentPage={+page}
                size={size}
                totalPages={data?.totalPages}
            />
        </div>
    );
}
