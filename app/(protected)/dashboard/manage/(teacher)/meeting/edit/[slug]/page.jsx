import { Suspense } from "react";
import LessonProgramManagementFormSkeleton from "@/components/dashboard/lesson-program-management/lesson-program-management-form/lesson-program-management-form-skeleton";
import PageTitle from "@/components/common/page-title/page-title";
import UpdateMeeting from "@/components/dashboard/meeting-management/update-meeting/update-meeting";

export default function MeetingEditPage({ params }) {
    const { slug } = params;
    return (
        <>
            <PageTitle title="Update Meeting" />
            <Suspense fallback={<LessonProgramManagementFormSkeleton />}>
                <UpdateMeeting slug={slug} />
            </Suspense>
        </>
    );
}
