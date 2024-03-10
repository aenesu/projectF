import Image from "next/image";
import styles from "./avatar.module.scss";

export default function Avatar({
    height = 80,
    src,
    rounded = false,
    title,
    width = 80,
}) {
    const roundedStyle = rounded ? styles.rounded : "";

    return !src ? (
        <div
            className={`${styles.avatar} ${styles.noImage} ${roundedStyle}`}
            style={{ width, height }}
            title={title}>
            {title
                .split(" ")
                .map((word) => word[0])
                .join(".")}
        </div>
    ) : (
        <Image
            className={`${styles.avatar} ${roundedStyle}`}
            src={src}
            width={width}
            height={height}
            alt={title}
            title={title}
        />
    );
}

// JOHN DOE
