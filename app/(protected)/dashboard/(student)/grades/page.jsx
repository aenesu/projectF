import { Suspense } from "react";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import GradeList from "@/components/dashboard/student/grade-list/grade-list";
import PageTitle from "@/components/common/page-title/page-title";

export default function GradesPage({ searchParams }) {
    let { page, size } = searchParams;
    page = page || 1;
    size = size || 6;

    return (
        <>
            <PageTitle title="Grades" />
            <Suspense fallback={<AdminListSkeleton />}>
                <GradeList page={page} size={size} />
            </Suspense>
        </>
    );
}
