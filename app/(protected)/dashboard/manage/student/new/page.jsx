import { Suspense } from "react";
import LessonProgramManagementFormSkeleton from "@/components/dashboard/lesson-program-management/lesson-program-management-form/lesson-program-management-form-skeleton";
import PageTitle from "@/components/common/page-title/page-title";
import NewStudent from "@/components/dashboard/student-management/new-student/new-student";

export default function NewStudentPage() {
    return (
        <>
            <PageTitle title="Create New Student" />
            <Suspense fallback={<LessonProgramManagementFormSkeleton />}>
                <NewStudent />
            </Suspense>
        </>
    );
}
