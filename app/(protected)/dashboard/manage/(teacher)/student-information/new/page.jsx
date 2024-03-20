import { Suspense } from "react";
import LessonProgramManagementFormSkeleton from "@/components/dashboard/lesson-program-management/lesson-program-management-form/lesson-program-management-form-skeleton";
import NewStudentInformation from "@/components/dashboard/student-information-management/new-student-information/new-student-information";
import PageTitle from "@/components/common/page-title/page-title";

export default function NewStudentInformationPage() {
    return (
        <>
            <PageTitle title="Create New Student Information" />
            <Suspense fallback={<LessonProgramManagementFormSkeleton />}>
                <NewStudentInformation />
            </Suspense>
        </>
    );
}
