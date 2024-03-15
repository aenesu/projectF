import { Suspense } from "react";
import LessonProgramManagementFormSkeleton from "@/components/dashboard/lesson-program-management/lesson-program-management-form/lesson-program-management-form-skeleton";
import PageTitle from "@/components/common/page-title/page-title";
import NewLessonProgram from "@/components/dashboard/lesson-program-management/new-lesson-program/new-lesson-program";

export default function NewLessonProgramPage() {
    return (
        <>
            <PageTitle title="Create New Lesson Program" />
            <Suspense fallback={<LessonProgramManagementFormSkeleton />}>
                <NewLessonProgram />
            </Suspense>
        </>
    );
}
