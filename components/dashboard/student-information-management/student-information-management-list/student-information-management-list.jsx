import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getStudentInformationByPageAsTeacher } from "@/actions/student-information/get-student-information-by-page-as-teacher";
import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import Pagination from "@/components/common/pagination/pagination";
import StudentInformationManagementCard from "@/components/dashboard/student-information-management/student-information-management-card/student-information-management-card";
import styles from "./admin-list.module.scss";

export default async function StudentInformationManagementList({ page, size }) {
    const data = await getStudentInformationByPageAsTeacher(page - 1, size);
    const isData =
        data && data?.status !== "error" && data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isData ? (
                    data?.content?.map((item, index) => (
                        <StudentInformationManagementCard
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
                baseUrl="/dashboard/manage/student-information"
                currentPage={+page}
                size={size}
                totalPages={data?.totalPages}
            />
        </div>
    );
}
