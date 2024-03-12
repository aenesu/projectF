import PageTitle from "@/components/common/page-title/page-title";
import ManagerForm from "@/components/dashboard/manager/manager-form/manager-form";

export default function NewManagerPage() {
    return (
        <>
            <PageTitle title="Create New Manager" />
            <ManagerForm />
        </>
    );
}
