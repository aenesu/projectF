import PageTitle from "@/components/common/page-title/page-title";
import AssistantManagerForm from "@/components/dashboard/assistant-manager/assistant-manager-form/assistant-manager-form";

export default function NewAssistantManagerPage() {
    return (
        <>
            <PageTitle title="Create New Assistant Manager" />
            <AssistantManagerForm />
        </>
    );
}
