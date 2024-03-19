import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getMeetingsByPage } from "@/actions/meeting/get-meetings-by-page";
import MeetingManagementCard from "@/components/dashboard/meeting-management/meeting-management-card/meeting-management-card";
import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import Pagination from "@/components/common/pagination/pagination";
import styles from "./admin-list.module.scss";

export default async function MeetingManagementList({
    page,
    size,
    sort,
    type,
}) {
    const data = await getMeetingsByPage(page - 1, size, sort, type);
    const isData =
        data && data?.status !== "error" && data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isData ? (
                    data?.content?.map((item, index) => (
                        <MeetingManagementCard
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
                baseUrl="/dashboard/manage/meeting"
                currentPage={+page}
                size={size}
                totalPages={data?.totalPages}
            />
        </div>
    );
}
