"use client";

import { swalToast } from "@/utils/functions/swal/swal-toast";
import { swalQuestion } from "@/utils/functions/swal/swal-question";
import styles from "./delete-button.module.scss";

const handleDelete = (cb, id, errorText, questionText, successText) => {
    try {
        swalQuestion(questionText).then(async (response) => {
            if (response.isConfirmed) {
                const response = await cb(id);

                if (response?.status === "error") {
                    return swalToast(errorText, "error");
                }

                swalToast(successText, "success");
            }
        });
    } catch (error) {
        swalToast(errorText, "error");
    }
};

export default function DeleteButton({
    builtIn,
    cb,
    id,
    title,
    errorText,
    questionText,
    successText,
}) {
    return (
        <button
            className={styles.button}
            type="button"
            title={title || "Delete"}
            onClick={() =>
                handleDelete(cb, id, errorText, questionText, successText)
            }
            disabled={builtIn}>
            <svg viewBox="0 0 448 512" className={styles.svgIcon}>
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
            </svg>
        </button>
    );
}
