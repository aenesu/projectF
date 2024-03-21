import PageTitle from "@/components/common/page-title/page-title";
import AdminListSkeleton from "@/components/dashboard/admin/admin-list/admin-list-skeleton";
import MeetingList from "@/components/dashboard/student/meeting-list/meeting-list";
import { Suspense } from "react";

export default function MeetingsPage() {
    return (
        <>
            <PageTitle title="Meetings" />
            <Suspense fallback={<AdminListSkeleton />}>
                <MeetingList />
            </Suspense>
        </>
    );
}
