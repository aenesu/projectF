import { getEducationTerms } from "@/actions/education-term/get-education-terms";
import { getLessons } from "@/actions/lesson/get-lessons";
import { getStudentInformationById } from "@/actions/student-information/get-student-information-by-id";
import { getStudentsAsAdvisorTeacher } from "@/actions/student/get-students-as-advisor-teacher";
import UpdateStudentInformationManagementForm from "@/components/dashboard/student-information-management/update-student-information-management-form/update-student-information-management-form";

export default async function UpdateStudentInformation({ slug }) {
    const [data, studentsData, lessonsData, educationTermsData] =
        await Promise.all([
            getStudentInformationById(slug),
            getStudentsAsAdvisorTeacher(),
            getLessons(),
            getEducationTerms(),
        ]);

    return (
        <UpdateStudentInformationManagementForm
            data={data}
            educationTermsData={educationTermsData}
            lessonsData={lessonsData}
            slug={slug}
            studentsData={studentsData}
        />
    );
}
