import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import Pagination from "@/components/common/pagination/pagination";
import { getManagersByPage } from "@/actions/manager/get-managers-by-page";
import ManagerCard from "@/components/dashboard/manager/manager-card/manager-card";
import styles from "./admin-list.module.scss";

export default async function ManagerList({ page, size, sort, type }) {
    const data = await getManagersByPage(page - 1, size, sort, type);
    const isData =
        data && data?.status !== "error" && data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isData ? (
                    data?.content?.map((item, index) => (
                        <ManagerCard
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
                baseUrl="/dashboard/manage/manager"
                currentPage={+page}
                size={size}
                totalPages={data?.totalPages}
            />
        </div>
    );
}
