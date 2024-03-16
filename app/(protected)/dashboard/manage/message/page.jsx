import { Suspense } from "react";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import MessageList from "@/components/dashboard/message/message-list/message-list";
import PageTitle from "@/components/common/page-title/page-title";
import styles from "./admin-management-page.module.scss";

export default function MessageManagementPage({ searchParams }) {
    let { page, size, sort, type } = searchParams;

    page = page || 1;
    size = size || 12;
    sort = sort || "date";
    type = type || "desc";

    return (
        <>
            <PageTitle title="Contact Messages" />
            <div className={styles.container}>
                <Suspense fallback={<AdminListSkeleton />}>
                    <MessageList
                        page={page}
                        size={size}
                        sort={sort}
                        type={type}
                    />
                </Suspense>
            </div>
        </>
    );
}
