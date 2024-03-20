import { getMeetingById } from "@/actions/meeting/get-meeting-by-id";
import { getStudents } from "@/actions/student/get-students";
import UpdateMeetingManagementForm from "@/components/dashboard/meeting-management/update-meeting-management-form/update-meeting-management-form";

export default async function UpdateMeeting({ slug }) {
    const [data, studentsData] = await Promise.all([
        getMeetingById(slug),
        getStudents(),
    ]);

    return (
        <UpdateMeetingManagementForm data={data} studentsData={studentsData} />
    );
}
