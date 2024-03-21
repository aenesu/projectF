import { Suspense } from "react";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import LessonList from "@/components/dashboard/student/lesson-list/lesson-list";
import PageTitle from "@/components/common/page-title/page-title";

export default function LessonsPage() {
    return (
        <>
            <PageTitle title="Lessons" />
            <Suspense fallback={<AdminListSkeleton />}>
                <LessonList />
            </Suspense>
        </>
    );
}
