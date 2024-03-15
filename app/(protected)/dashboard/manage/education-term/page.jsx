import PlusLink from "@/components/common/plus-link/plus-link";
import { Suspense } from "react";
import PageTitle from "@/components/common/page-title/page-title";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import { AiOutlineSchedule } from "react-icons/ai";
import styles from "./admin-management-page.module.scss";
import EducationTermList from "@/components/dashboard/education-term/education-term-list/education-term-list";

export default function EducationTermManagementPage({ searchParams }) {
    let { page, size } = searchParams;

    page = page || 1;
    size = size || 6;

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink
                    href="/dashboard/manage/education-term/new"
                    title="Education Terms">
                    <AiOutlineSchedule />
                </PlusLink>
            </div>
            <PageTitle title="Education Terms" />
            <div className={styles.container}>
                <Suspense fallback={<AdminListSkeleton />}>
                    <EducationTermList page={page} size={size} />
                </Suspense>
            </div>
        </>
    );
}
