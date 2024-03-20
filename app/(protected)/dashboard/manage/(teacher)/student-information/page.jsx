import { Suspense } from "react";
import { GiNotebook } from "react-icons/gi";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import PlusLink from "@/components/common/plus-link/plus-link";
import PageTitle from "@/components/common/page-title/page-title";
import StudentInformationManagementList from "@/components/dashboard/student-information-management/student-information-management-list/student-information-management-list";
import styles from "./admin-management-page.module.scss";

export default function StudentInformationManagementPage({ searchParams }) {
    let { page, size, sort, type } = searchParams;

    page = page || 1;
    size = size || 6;

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink
                    href="/dashboard/manage/student-information/new"
                    title="Student Information">
                    <GiNotebook />
                </PlusLink>
            </div>
            <PageTitle title="Student Information" />
            <div className={styles.container}>
                <Suspense fallback={<AdminListSkeleton />}>
                    <StudentInformationManagementList
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
