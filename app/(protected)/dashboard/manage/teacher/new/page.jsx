import { Suspense } from "react";
import LessonProgramManagementFormSkeleton from "@/components/dashboard/lesson-program-management/lesson-program-management-form/lesson-program-management-form-skeleton";
import NewTeacher from "@/components/dashboard/teacher-management/new-teacher/new-teacher";
import PageTitle from "@/components/common/page-title/page-title";

export default function NewTeacherPage() {
    return (
        <>
            <PageTitle title="Create New Teacher" />
            <Suspense fallback={<LessonProgramManagementFormSkeleton />}>
                <NewTeacher />
            </Suspense>
        </>
    );
}