import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import Pagination from "@/components/common/pagination/pagination";
import AssistantManagerCard from "@/components/dashboard/assistant-manager/assistant-manager-card/assistant-manager-card";
import { getAssistantManagersByPage } from "@/actions/assistant-manager/get-assistant-managers-by-page";
import styles from "./admin-list.module.scss";

export default async function AssistantManagerList({ page, size, sort, type }) {
    const data = await getAssistantManagersByPage(page - 1, size, sort, type);
    const isData =
        data && data?.status !== "error" && data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isData ? (
                    data?.content?.map((item, index) => (
                        <AssistantManagerCard
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
                baseUrl="/dashboard/manage/assistant-manager"
                currentPage={+page}
                size={size}
                totalPages={data?.totalPages}
            />
        </div>
    );
}