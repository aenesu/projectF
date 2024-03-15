import PlusLink from "@/components/common/plus-link/plus-link";
import { Suspense } from "react";
import PageTitle from "@/components/common/page-title/page-title";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import { AiOutlineSchedule } from "react-icons/ai";
import LessonManagementList from "@/components/dashboard/lesson-management/lesson-management-list/lesson-management-list";
import styles from "./admin-management-page.module.scss";

export default function LessonManagementPage({ searchParams }) {
    let { page, size, sort, type } = searchParams;

    page = page || 1;
    size = size || 6;
    sort = sort || "lessonName";
    type = type || "asc";

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/lesson/new" title="Lessons">
                    <AiOutlineSchedule />
                </PlusLink>
            </div>
            <PageTitle title="Lessons" />
            <div className={styles.container}>
                <Suspense fallback={<AdminListSkeleton />}>
                    <LessonManagementList
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
