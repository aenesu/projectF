import { getAdvisorTeachers } from "@/actions/advisor-teacher/get-advisor-teachers";
import { getStudentById } from "@/actions/student/get-student-by-id";
import PageTitle from "@/components/common/page-title/page-title";
import UpdateStudentManagementForm from "@/components/dashboard/student-management/update-student-management-form/update-student-management-form";

export default async function StudentEditPage({ params }) {
    const { slug } = params;

    const data = await getStudentById(slug);
    const advisorTeacherData = await getAdvisorTeachers();

    return (
        <>
            <PageTitle title={`Update Student - ${slug}`} />
            <UpdateStudentManagementForm
                data={data}
                advisorTeacherData={advisorTeacherData}
                slug={slug}
            />
        </>
    );
}
