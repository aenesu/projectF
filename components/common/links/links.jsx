import { auth } from "@/auth";
import { filterAndSortDataByTitle } from "@/utils/functions/filter-and-sort-data-by-title";
import { sidebarData } from "@/data/sidebar-data";
import PlusLink from "@/components/common/plus-link/plus-link";
import styles from "./links.module.scss";

export default async function Links() {
    // TODO: Add a horizontal scrollbar to the links container
    const session = await auth();

    const role = session?.user?.role === "STUDENT" ? "" : session?.user?.role;

    const sortedData = filterAndSortDataByTitle(sidebarData, role);

    return (
        <div className={styles.container}>
            {sortedData.slice(1).map((item) => (
                <PlusLink
                    key={item._id}
                    href={`${item.pathname}/new`}
                    title={item.title}>
                    {item.icon}
                </PlusLink>
            ))}
        </div>
    );
}
