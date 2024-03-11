import SkeletonLoader from "@/components/common/skeleton-loader/skeleton-loader";
import styles from "./admin-list.module.scss";

export default function AdminListSkeleton() {
    return (
        <div className={styles.container}>
            <div
                className={`${styles.cardsContainer} ${styles.skeletonContainer}`}>
                <SkeletonLoader height="230px" flex="1 1 450px" />
                <SkeletonLoader height="230px" flex="1 1 450px" />
                <SkeletonLoader height="230px" flex="1 1 450px" />
                <SkeletonLoader height="230px" flex="1 1 450px" />
                <SkeletonLoader height="230px" flex="1 1 450px" />
                <SkeletonLoader height="230px" flex="1 1 450px" />
            </div>
            <hr className={styles.hr} />
            <div className={styles.paginationContainer}>
                <SkeletonLoader width="50px" height="50px" rounded notRing />
                <SkeletonLoader width="50px" height="50px" rounded notRing />
                <SkeletonLoader width="50px" height="50px" rounded notRing />
            </div>
        </div>
    );
}
