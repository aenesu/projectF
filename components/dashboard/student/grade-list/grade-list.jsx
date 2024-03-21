import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getStudentInformationAsStudent } from "@/actions/student/get-student-information-as-student";
import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import Pagination from "@/components/common/pagination/pagination";
import StudentInformationManagementCard from "@/components/dashboard/student-information-management/student-information-management-card/student-information-management-card";
import styles from "./admin-list.module.scss";

export default async function GradeList({ page, size }) {
    const data = await getStudentInformationAsStudent(page - 1, size);
    const isData =
        data && data?.status !== "error" && data?.content?.length > 0;

    return (
        <div className={styles.container}>
            {isData ? (
                <div className={styles.cardsContainer}>
                    {data?.content?.map((item, index) => (
                        <StudentInformationManagementCard
                            key={index}
                            data={item}
                            orderNumber={calculateOrderNumber(
                                page,
                                size,
                                index
                            )}
                        />
                    ))}
                </div>
            ) : (
                <NoDataAvailable />
            )}
            <hr className={styles.hr} />
            <Pagination
                baseUrl="/dashboard/grades"
                currentPage={+page}
                size={size}
                totalPages={data?.totalPages}
            />
        </div>
    );
}
