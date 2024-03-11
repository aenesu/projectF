import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import { getAdminsByPage } from "@/actions/admin/get-admins-by-page";
import AdminCard from "@/components/dashboard/admin/admin-card/admin-card";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import Pagination from "@/components/common/pagination/pagination";
import styles from "./manager-list.module.scss";

export default async function ManagerList({ page, size, sort, type }) {
    const data = await getAdminsByPage(page - 1, size, sort, type);
    const isData =
        data && data?.status !== "error" && data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isData ? (
                    data?.content?.map((item, index) => (
                        <AdminCard
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
