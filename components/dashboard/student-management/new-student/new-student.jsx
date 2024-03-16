import { getAdvisorTeachers } from "@/actions/advisor-teacher/get-advisor-teachers";
import StudentManagementForm from "@/components/dashboard/student-management/student-management-form/student-management-form";

export default async function NewStudent() {
    const data = await getAdvisorTeachers();

    return <StudentManagementForm data={data} />;
}
