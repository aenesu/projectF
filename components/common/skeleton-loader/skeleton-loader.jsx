import LoaderRing from "@/components/common/loader-ring/loader-ring";
import styles from "./skeleton-loader.module.scss";

export default function SkeletonLoader({
    height = "100%",
    width = "100%",
    flex,
    rounded,
    notRing,
}) {
    const isRounded = rounded ? styles.rounded : "";
    const skeletonStyles = {
        height,
        width,
        flex,
    };

    return (
        <div
            className={`${styles.skeletonLoader} ${isRounded}`}
            style={skeletonStyles}>
            {notRing || <LoaderRing width="100px" height="100px" />}
        </div>
    );
}
