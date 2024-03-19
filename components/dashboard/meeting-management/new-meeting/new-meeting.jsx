import { getStudentsAsAdvisorTeacher } from "@/actions/student/get-students-as-advisor-teacher";
import MeetingManagementForm from "@/components/dashboard/meeting-management/meeting-management-form/meeting-management-form";

export default async function NewMeeting() {
    const data = await getStudentsAsAdvisorTeacher();
    return <MeetingManagementForm studentsData={data} />;
}
