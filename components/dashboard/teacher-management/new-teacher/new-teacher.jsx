import { getLessonPrograms } from "@/actions/lesson-program/get-lesson-programs";
import { extractLessonPrograms } from "@/utils/functions/extract-lesson-programs";
import TeacherManagementForm from "@/components/dashboard/teacher-management/teacher-management-form/teacher-management-form";

export default async function NewTeacher() {
    const rawData = await getLessonPrograms();
    const data = extractLessonPrograms(rawData);

    return <TeacherManagementForm data={data} />;
}
