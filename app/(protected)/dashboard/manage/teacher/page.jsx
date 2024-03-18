import { Suspense } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import PlusLink from "@/components/common/plus-link/plus-link";
import PageTitle from "@/components/common/page-title/page-title";
import TeacherManagementList from "@/components/dashboard/teacher-management/teacher-management-list/teacher-management-list";
import styles from "./admin-management-page.module.scss";

export default function TeacherManagementPage({ searchParams }) {
    let { page, size, sort, type } = searchParams;
    page = page || 1;
    size = size || 6;
    sort = sort || "name";
    type = type || "desc";

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/teacher/new" title="Teacher">
                    <FaChalkboardTeacher />
                </PlusLink>
            </div>
            <PageTitle title="Teachers" />
            <div className={styles.container}>
                <Suspense fallback={<AdminListSkeleton />}>
                    <TeacherManagementList
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