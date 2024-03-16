import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getMessagesByPage } from "@/actions/message/get-messages-by-page";
import MessageCard from "@/components/dashboard/message/message-card/message-card";
import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import Pagination from "@/components/common/pagination/pagination";
import styles from "./admin-list.module.scss";

export default async function MessageList({ page, size, sort, type }) {
    const data = await getMessagesByPage(page - 1, size, sort, type);
    const isData =
        data && data?.status !== "error" && data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isData ? (
                    data?.content?.map((item, index) => (
                        <MessageCard
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
                baseUrl="/dashboard/manage/message"
                currentPage={+page}
                size={size}
                totalPages={data?.totalPages}
            />
        </div>
    );
}
