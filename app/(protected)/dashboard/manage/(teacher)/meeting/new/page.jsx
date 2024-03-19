import { Suspense } from "react";
import NewMeeting from "@/components/dashboard/meeting-management/new-meeting/new-meeting";
import LessonProgramManagementFormSkeleton from "@/components/dashboard/lesson-program-management/lesson-program-management-form/lesson-program-management-form-skeleton";
import PageTitle from "@/components/common/page-title/page-title";

export default async function NewMeetingPage() {
    
    return (
        <>
            <PageTitle title="Create New Meeting" />
            <Suspense fallback={<LessonProgramManagementFormSkeleton />}>
                <NewMeeting />
            </Suspense>
        </>
    );
}
