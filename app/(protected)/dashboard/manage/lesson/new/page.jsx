import PageTitle from "@/components/common/page-title/page-title";
import LessonManagementForm from "@/components/dashboard/lesson-management/lesson-management-form/lesson-management-form";

export default function NewLessonPage() {
    return (
        <>
            <PageTitle title="Create New Lesson" />
            <LessonManagementForm />
        </>
    );
}
