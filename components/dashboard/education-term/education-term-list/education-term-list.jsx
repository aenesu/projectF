import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import Pagination from "@/components/common/pagination/pagination";
import EducationTermCard from "@/components/dashboard/education-term/education-term-card/education-term-card";
import { getEducationTermsByPage } from "@/actions/education-term/get-education-terms-by-page";
import styles from "./admin-list.module.scss";

export default async function EducationTermList({ page, size }) {
    const data = await getEducationTermsByPage(page - 1, size);
    const isData =
        data && data?.status !== "error" && data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isData ? (
                    data?.content?.map((item, index) => (
                        <EducationTermCard
                            key={index}
                            data={item}
                            authorized={true}
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
                baseUrl="/dashboard/manage/education-term"
                currentPage={+page}
                size={size}
                totalPages={data?.totalPages}
            />
        </div>
    );
}
