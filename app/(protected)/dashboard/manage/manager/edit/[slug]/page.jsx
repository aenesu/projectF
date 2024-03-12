import { getManagerById } from "@/actions/manager/get-manager-by-id";
import PageTitle from "@/components/common/page-title/page-title";
import UpdateManagerForm from "@/components/dashboard/manager/update-manager-form/update-manager-form";

export default async function ManagerEditPage({ params }) {
    const { slug } = params;

    const data = await getManagerById(slug);

    return (
        <>
            <PageTitle title={`Update Manager - ${slug}`} />
            <UpdateManagerForm data={data} slug={slug} />
        </>
    );
}
