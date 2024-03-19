import { extractLessonPrograms } from "@/utils/functions/extract-lesson-programs";
import { getLessonPrograms } from "@/actions/lesson-program/get-lesson-programs";
import { getTeacherById } from "@/actions/teacher/get-teacher-by-id";
import PageTitle from "@/components/common/page-title/page-title";
import UpdateTeacherManagementForm from "@/components/dashboard/teacher-management/update-teacher-management-form/update-teacher-management-form";

export default async function TeacherEditPage({ params }) {
    const { slug } = params;

    const data = await getTeacherById(slug);
    const rawData = await getLessonPrograms();
    const lessonProgramsData = extractLessonPrograms(rawData);

    return (
        <>
            <PageTitle title={`Update Teacher - ${slug}`} />
            <UpdateTeacherManagementForm
                data={data}
                lessonProgramsData={lessonProgramsData}
                slug={slug}
            />
        </>
    );
}
