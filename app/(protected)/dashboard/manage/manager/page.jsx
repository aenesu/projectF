import PlusLink from "@/components/common/plus-link/plus-link";
import { Suspense } from "react";
import PageTitle from "@/components/common/page-title/page-title";
import { GrUserManager } from "react-icons/gr";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import ManagerList from "@/components/dashboard/manager/manager-list/manager-list";
import styles from "./admin-management-page.module.scss";

export default function ManagerManagementPage({ searchParams }) {
    let { page, size, sort, type } = searchParams;

    page = page || 1;
    size = size || 6;
    sort = sort || "name";
    type = type || "desc";

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/manager/new" title="Manager">
                    <GrUserManager />
                </PlusLink>
            </div>
            <PageTitle title="Managers (Deans)" />
            <div className={styles.container}>
                <Suspense fallback={<AdminListSkeleton />}>
                    <ManagerList
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
