"use client";

import { usePathname } from "next/navigation";
import { filterAndSortDataByTitle } from "@/utils/functions/filter-and-sort-data-by-title";
import { sidebarData } from "@/data/sidebar-data";
import Link from "next/link";
import styles from "./sidebar-links.module.scss";

export default function SidebarLinks({ role }) {
    const pathname = usePathname();

    const sortedData = filterAndSortDataByTitle(sidebarData, role);

    return (
        sortedData &&
        sortedData.map((item) => (
            <Link
                key={item._id}
                href={item.pathname}
                title={`Go To ${item.title}`}
                className={`${styles.linkItems} ${
                    pathname === item.pathname ? styles.activeLink : ""
                }`}>
                <span>{item.icon}</span>
                <span>{item.title}</span>
            </Link>
        ))
    );
}
