"use client";

import SubmitButton from "@/components/common/submit-button/submit-button";
import { useFormState } from "react-dom";
import lessonManagementFormData from "@/data/lesson-management-form.json";
import ErrorText from "@/components/common/error-text/error-text";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import styles from "./admin-form.module.scss";
import { createLessonAction } from "@/actions/lesson/create-lesson-action";

export default function LessonManagementForm() {
    const [state, dispatch] = useFormState(createLessonAction, {
        status: "",
        message: null,
        errors: {},
    });

    if (state?.status === "error") {
        swalToast(state?.message, "error", 3000);
    }

    return (
        <form action={dispatch} className={styles.formContainer}>
            {state?.errors && state?.errors?.commonError && (
                <div className={styles.errorContainer}>
                    <ErrorText text={state?.errors?.commonError} />
                </div>
            )}
            <div className={styles.inputsContainer}>
                {lessonManagementFormData.map((item) => (
                    <div key={item._id} className={styles.inputGroup}>
                        <label htmlFor={item.name} className={styles.label}>
                            {item.label}
                        </label>
                        <input
                            autoComplete={item.autoComplete}
                            className={styles.input}
                            id={item.name}
                            name={item.name}
                            placeholder={item.placeholder}
                            type={item.type}
                        />
                        {state?.errors && state?.errors[item.name] && (
                            <span className={styles.error}>
                                {state?.errors[item.name]}
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.submitContainer}>
                <SubmitButton title="Create" loadingText="Creating" />
            </div>
        </form>
    );
}
