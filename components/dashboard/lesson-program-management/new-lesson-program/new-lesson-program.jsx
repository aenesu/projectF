import { getEducationTerms } from "@/actions/education-term/get-education-terms";
import { getLessons } from "@/actions/lesson/get-lessons";
import LessonProgramManagementForm from "@/components/dashboard/lesson-program-management/lesson-program-management-form/lesson-program-management-form";

export default async function NewLessonProgram() {
    const [educationTermsData, lessonsData] = await Promise.all([
        getEducationTerms(),
        getLessons(),
    ]);

    return (
        <LessonProgramManagementForm
            educationTermsData={educationTermsData}
            lessonsData={lessonsData}
        />
    );
}
