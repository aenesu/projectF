import SkeletonLoader from "@/components/common/skeleton-loader/skeleton-loader";
import styles from "./admin-form.module.scss";

export default function LessonProgramManagementFormSkeleton() {
    return (
        <div className={styles.formContainer}>
            <div className={styles.inputsContainer}>
                <SkeletonLoader height="20px" width="150px" notRing />
                <SkeletonLoader height="50px" notRing />
                <SkeletonLoader height="20px" width="150px" notRing />
                <SkeletonLoader height="50px" notRing />
                <SkeletonLoader height="20px" width="150px" notRing />
                <SkeletonLoader height="50px" notRing />
                <SkeletonLoader height="20px" width="150px" notRing />
                <SkeletonLoader height="50px" notRing />
                <SkeletonLoader height="20px" width="150px" notRing />
                <SkeletonLoader height="50px" notRing />
                <SkeletonLoader height="20px" width="150px" notRing />
                <SkeletonLoader height="50px" notRing />
            </div>
            <div className={styles.submitContainer}>
                <SkeletonLoader height="50px" notRing />
            </div>
        </div>
    );
}
