import { Suspense } from "react";
import { MdOutlineViewTimeline } from "react-icons/md";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import LessonProgramManagementList from "@/components/dashboard/lesson-program-management/lesson-program-management-list/lesson-program-management-list";
import PageTitle from "@/components/common/page-title/page-title";
import PlusLink from "@/components/common/plus-link/plus-link";
import styles from "./admin-management-page.module.scss";

export default function LessonProgramManagementPage({ searchParams }) {
    let { page, size, sort, type } = searchParams;

    page = page || 1;
    size = size || 6;
    sort = sort || "day";
    type = type || "asc";

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink
                    href="/dashboard/manage/lesson-program/new"
                    title="Lesson Programs">
                    <MdOutlineViewTimeline />
                </PlusLink>
            </div>
            <PageTitle title="Lesson Programs" />
            <div className={styles.container}>
                <Suspense fallback={<AdminListSkeleton />}>
                    <LessonProgramManagementList
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
