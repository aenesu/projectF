import { Suspense } from "react";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import ChooseLessonForm from "@/components/dashboard/student/choose-lesson-form/choose-lesson-form";
import { getLessonPrograms } from "@/actions/lesson-program/get-lesson-programs";
import NoDataAvailable from "@/components/common/no-data-available/no-data-available";
import PageTitle from "@/components/common/page-title/page-title";

const ChooseLessonList = async () => {
    const data = await getLessonPrograms();
    const isData = data && data?.status !== "error" && data?.length > 0;

    return isData ? <ChooseLessonForm data={data} /> : <NoDataAvailable />;
};

export default function ChooseLessonPage() {
    return (
        <>
            <PageTitle title="Choose Lessons" />
            <Suspense fallback={<AdminListSkeleton />}>
                <ChooseLessonList />
            </Suspense>
        </>
    );
}
