import PlusLink from "@/components/common/plus-link/plus-link";
import { Suspense } from "react";
import PageTitle from "@/components/common/page-title/page-title";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import { PiStudentFill } from "react-icons/pi";
import StudentManagementList from "@/components/dashboard/student-management/student-management-list/student-management-list";
import styles from "./admin-management-page.module.scss";

export default function StudentManagementPage({ searchParams }) {
    let { page, size, sort, type } = searchParams;

    page = page || 1;
    size = size || 6;
    sort = sort || "name";
    type = type || "desc";

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/student/new" title="Student">
                    <PiStudentFill />
                </PlusLink>
            </div>
            <PageTitle title="Students" />
            <div className={styles.container}>
                <Suspense fallback={<AdminListSkeleton />}>
                    <StudentManagementList
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
