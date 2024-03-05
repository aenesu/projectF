"use client"

import { useSelectedLayoutSegment } from "next/navigation";
import styles from "./breadcrumb.module.scss";

export default function Breadcrumb() {
  const segment = useSelectedLayoutSegment();
  return (
    <nav aria-label="breadcrumb">
      <ul className={styles.breadcrumbList}>
        {/* Breadcrumb Items*/}
      </ul>
    </nav>
  )
}
