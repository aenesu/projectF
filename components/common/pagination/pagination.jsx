import Link from "next/link";
import styles from "./pagination.module.scss";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function Pagination({ baseUrl, currentPage, totalPages, size }) {
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;

    const renderDirectPageLinks = () => {
        return Array.from({ length: totalPages }, (_, i) => (
            <Link
                href={`${baseUrl}?size=${size}&page=${i + 1}`}
                key={`page-${i + 1}`}
                className={`${styles.pageItem} ${
                    currentPage === i + 1 ? styles.active : ""
                }`}
                title={`Go To Page ${i + 1}`}>
                {i + 1}
            </Link>
        ));
    };

    const renderPaginationWithEllipses = () => {
        let startPage, endPage;

        if (currentPage <= 3) {
            startPage = 2;
            endPage = 4;
        } else if (currentPage >= totalPages - 2) {
            startPage = totalPages - 3;
            endPage = totalPages - 1;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        return (
            <>
                <Link
                    href={`${baseUrl}?size=${size}&page=1`}
                    className={`${styles.pageItem} ${
                        currentPage === 1 ? styles.active : ""
                    }`}
                    title={`Go To Page 1`}>
                    1
                </Link>
                <span className={styles.ellipses}>...</span>
                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                ).map((page) => (
                    <Link
                        href={`${baseUrl}?size=${size}&page=${page}`}
                        key={`page-${page}`}
                        className={`${styles.pageItem} ${
                            currentPage === page ? styles.active : ""
                        }`}
                        title={`Go To Page ${page}`}>
                        {page}
                    </Link>
                ))}

                <span className={styles.ellipses}>...</span>
                <Link
                    href={`${baseUrl}?size=${size}&page=${totalPages}`}
                    className={`${styles.pageItem} ${
                        currentPage === totalPages ? styles.active : ""
                    }`}
                    title={`Go To Page ${totalPages}`}>
                    {totalPages}
                </Link>
            </>
        );
    };

    return (
        <div className={styles.pagination}>
            <Link
                className={`${styles.prev} ${styles.first} ${
                    currentPage === 1 ? styles.disabled : ""
                }`}
                href={`${baseUrl}?size=${size}&page=1`}
                title="Go To First Page">
                <IoChevronBackOutline size={30} />
                <IoChevronBackOutline size={30} />
            </Link>
            <Link
                className={`${styles.prev} ${
                    currentPage === 1 ? styles.disabled : ""
                }`}
                href={`${baseUrl}?size=${size}&page=${previousPage}`}
                title="Go To Previous Page">
                <IoChevronBackOutline size={30} />
            </Link>
            <div className={styles.pages}>
                {totalPages < 5
                    ? renderDirectPageLinks()
                    : renderPaginationWithEllipses()}
            </div>
            <Link
                className={`${styles.next} ${
                    currentPage === totalPages ? styles.disabled : ""
                }`}
                href={`${baseUrl}?size=${size}&page=${nextPage}`}
                title="Go To Next Page">
                <IoChevronForwardOutline size={30} />
            </Link>
            <Link
                className={`${styles.next} ${styles.last} ${
                    currentPage === totalPages ? styles.disabled : ""
                }`}
                href={`${baseUrl}?size=${size}&page=${nextPage}`}
                title="Go To Last Page">
                <IoChevronForwardOutline size={30} />
                <IoChevronForwardOutline size={30} />
            </Link>
        </div>
    );
}
