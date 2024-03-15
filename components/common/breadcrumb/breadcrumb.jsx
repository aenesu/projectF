"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import styles from "./breadcrumb.module.scss";
import Link from "next/link";

export default function Breadcrumb() {
    const segments = useSelectedLayoutSegments();
    const filteredSegments = segments.filter(
        (segment) =>
            !segment.startsWith("(") &&
            !segment.endsWith(")") &&
            segment !== "manage"
    );

    const breadcrumbItems = filteredSegments.map((segment, index) => {
        const formattedSegment = segment.replace(/-/g, " ");
        const path = `/${filteredSegments.slice(0, index + 1).join("/")}`;
        // TODO: The breadcrumb doesn't work properly probably due to filtering the segments
        return (
            <li key={index} className={styles.breadcrumbItem}>
                <Link
                    href={path}
                    title={`Go to ${formattedSegment}`}
                    className={styles.breadcrumbLink}>
                    {formattedSegment}
                </Link>
            </li>
        );
    });

    return (
        <nav aria-label="breadcrumb">
            <ul className={styles.breadcrumbList}>{breadcrumbItems}</ul>
        </nav>
    );
}
