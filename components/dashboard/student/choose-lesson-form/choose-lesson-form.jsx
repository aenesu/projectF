"use client";

import { useFormState } from "react-dom";
import { chooseLessonProgramAction } from "@/actions/lesson-program/choose-lesson-program-action";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import ErrorText from "@/components/common/error-text/error-text";
import SubmitButton from "@/components/common/submit-button/submit-button";
import LessonProgramManagementCard from "../../lesson-program-management/lesson-program-management-card/lesson-program-management-card";
import styles from "./choose-lesson-form.module.scss";

export default function ChooseLessonForm({ data }) {
    const [state, dispatch] = useFormState(chooseLessonProgramAction, {
        status: "",
        message: "",
        errors: null,
    });

    if (state?.status === "error") {
        swalToast(state?.message, "error", 3000);
    }

    return (
        <form action={dispatch} className={styles.container}>
            {state?.errors?.commonError && (
                <div className={styles.errorContainer}>
                    <ErrorText text={state?.errors?.commonError} />
                </div>
            )}
            {state?.errors?.lessonProgramId && (
                <div className={styles.errorContainer}>
                    <ErrorText text={state?.errors?.lessonProgramId} />
                </div>
            )}
            <div className={styles.cardsContainer}>
                {data?.map((item, index) => (
                    <div key={index} className={styles.inputGroup}>
                        <input
                            type="checkbox"
                            id={item.lessonProgramId}
                            name="lessonProgramId"
                            className={styles.input}
                            value={item.lessonProgramId}
                        />
                        <label
                            className={styles.label}
                            htmlFor={item.lessonProgramId}>
                            <LessonProgramManagementCard data={item} />
                        </label>
                    </div>
                ))}
            </div>
            <div className={styles.submitContainer}>
                <SubmitButton title="Save" loadingText="Saving" />
            </div>
        </form>
    );
}
