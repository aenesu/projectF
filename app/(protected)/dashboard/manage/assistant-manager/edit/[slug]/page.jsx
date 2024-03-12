import { getAssistantManagerById } from "@/actions/assistant-manager/get-assistant-manager-by-id";
import PageTitle from "@/components/common/page-title/page-title";
import UpdateAssistantManagerForm from "@/components/dashboard/assistant-manager/update-assistant-manager-form/update-assistant-manager-form";

export default async function AssistantManagerEditPage({ params }) {
    const { slug } = params;

    const data = await getAssistantManagerById(slug);
    console.log(data);

    return (
        <>
            <PageTitle title={`Update Assistant Manager - ${slug}`} />
            <UpdateAssistantManagerForm data={data} />
        </>
    );
}
