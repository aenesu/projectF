import { Suspense } from "react";
import LessonProgramManagementFormSkeleton from "@/components/dashboard/lesson-program-management/lesson-program-management-form/lesson-program-management-form-skeleton";
import PageTitle from "@/components/common/page-title/page-title";
import UpdateStudentInformation from "@/components/dashboard/student-information-management/update-student-information/update-student-information";

export default function UpdateStudentInformationPage({ params }) {
    const { slug } = params;
    return (
        <>
            <PageTitle title={`Update Student Information - ${slug}`} />
            <Suspense fallback={<LessonProgramManagementFormSkeleton />}>
                <UpdateStudentInformation slug={slug} />
            </Suspense>
        </>
    );
}
