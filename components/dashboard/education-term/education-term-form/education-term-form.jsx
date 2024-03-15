"use client";

import SubmitButton from "@/components/common/submit-button/submit-button";
import { useFormState } from "react-dom";
import educationTermFormData from "@/data/education-term-form.json";
import termOptions from "@/data/term-options.json";
import ErrorText from "@/components/common/error-text/error-text";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import styles from "./admin-form.module.scss";
import { createEducationTermAction } from "@/actions/education-term/create-education-term-action";

export default function EducationTermForm() {
    const [state, dispatch] = useFormState(createEducationTermAction, {
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
                {/* TERM */}
                <div className={styles.inputGroup}>
                    <label htmlFor="term" className={styles.label}>
                        TERM
                    </label>
                    <select name="term" id="term" className={styles.select}>
                        {termOptions.map((item) => (
                            <option key={item._id} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {state?.errors && state?.errors?.term && (
                        <span className={styles.error}>
                            {state?.errors?.term}
                        </span>
                    )}
                </div>
                {educationTermFormData.map((item) => (
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
