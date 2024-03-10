import PlusLink from "@/components/common/plus-link/plus-link";
import styles from "./admin-management-page.module.scss";
import { RiAdminFill } from "react-icons/ri";
import { Suspense } from "react";
import PageTitle from "@/components/common/page-title/page-title";
import AdminList from "@/components/dashboard/admin/admin-list/admin-list";

export default function AdminPage({ searchParams }) {
    let { page, size, sort, type } = searchParams;

    page = page || 1;
    size = size || 12;
    sort = sort || "name";
    type = type || "desc";

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/admin/new" title="Admin">
                    <RiAdminFill />
                </PlusLink>
            </div>
            <PageTitle title="Admins" />
            <div className={styles.container}>
                <Suspense>
                    <AdminList
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
