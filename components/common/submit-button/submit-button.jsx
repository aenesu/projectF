import { useFormStatus } from "react-dom";
import styles from "./submit-button.module.scss";
import Loader from "@/components/common/loader/loader";
import ThreeDots from "@/components/common/three-dots/three-dots";

export default function SubmitButton({ title, loadingText }) {
    const status = useFormStatus();

    return (
        <button type="submit" className={styles.submitButton} title={title}>
            {status.pending ? (
                <>
                    <Loader />
                    <span className={styles.submitting}>
                        {loadingText || "Submitting"}
                        <ThreeDots />
                    </span>
                </>
            ) : (
                title
            )}
        </button>
    );
}
