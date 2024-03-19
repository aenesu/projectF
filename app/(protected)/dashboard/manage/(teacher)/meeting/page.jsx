import { Suspense } from "react";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import { FaPeopleLine } from "react-icons/fa6";
import MeetingManagementList from "@/components/dashboard/meeting-management/meeting-management-list/meeting-management-list";
import PageTitle from "@/components/common/page-title/page-title";
import PlusLink from "@/components/common/plus-link/plus-link";
import styles from "./admin-management-page.module.scss";

export default function MeetingManagementPage({ searchParams }) {
    let { page, size, sort, type } = searchParams;

    page = page || 1;
    size = size || 6;
    sort = sort || "date";
    type = type || "asc";

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/meeting/new" title="Meeting">
                    <FaPeopleLine />
                </PlusLink>
            </div>
            <PageTitle title="Meetings" />
            <div className={styles.container}>
                <Suspense fallback={<AdminListSkeleton />}>
                    <MeetingManagementList
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
