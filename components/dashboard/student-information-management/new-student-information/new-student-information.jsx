import { getEducationTerms } from "@/actions/education-term/get-education-terms";
import { getLessons } from "@/actions/lesson/get-lessons";
import { getStudentsAsAdvisorTeacher } from "@/actions/student/get-students-as-advisor-teacher";
import StudentInformationManagementForm from "@/components/dashboard/student-information-management/student-information-management-form/student-information-management-form";

export default async function NewStudentInformation() {
    const [studentsData, lessonsData, educationTermsData] = await Promise.all([
        getStudentsAsAdvisorTeacher(),
        getLessons(),
        getEducationTerms(),
    ]);

    return (
        <StudentInformationManagementForm
            studentsData={studentsData}
            lessonsData={lessonsData}
            educationTermsData={educationTermsData}
        />
    );
}
