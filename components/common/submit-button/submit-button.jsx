import { useFormStatus } from "react-dom";
import Loader from "@/components/common/loader/loader";
import ThreeDots from "@/components/common/three-dots/three-dots";
import styles from "./submit-button.module.scss";

export default function SubmitButton({ title, loadingText }) {
    const status = useFormStatus();

    return (
        <button 
            type="submit" 
            title={title}
            className={styles.submitButton} 
            disabled={status.pending}>
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
