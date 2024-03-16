import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getStudentsByPage } from "@/actions/student/get-students-by-page";
import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import Pagination from "@/components/common/pagination/pagination";
import StudentManagementCard from "@/components/dashboard/student-management/student-management-card/student-management-card";
import styles from "./admin-list.module.scss";

export default async function StudentManagementList({
    page,
    size,
    sort,
    type,
}) {
    const data = await getStudentsByPage(page - 1, size, sort, type);
    const isData =
        data && data?.status !== "error" && data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isData ? (
                    data?.content?.map((item, index) => (
                        <StudentManagementCard
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
                baseUrl="/dashboard/manage/student"
                currentPage={+page}
                size={size}
                totalPages={data?.totalPages}
            />
        </div>
    );
}
