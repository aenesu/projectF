"use client";

import { useFormState } from "react-dom";
import SubmitButton from "@/components/common/submit-button/submit-button";
import lessonProgramManagementFormData from "@/data/lesson-program-management-form.json";
import ErrorText from "@/components/common/error-text/error-text";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import { createLessonAction } from "@/actions/lesson/create-lesson-action";
import { extractEducationTerms } from "@/utils/functions/extract-education-terms";
import weekdays from "@/data/weekdays.json";
import styles from "./admin-form.module.scss";
import MultiSelect from "@/components/common/multi-select/multi-select";
import { extractLessons } from "@/utils/functions/extract-lessons";

export default function LessonProgramManagementForm({
    educationTermsData,
    lessonsData,
}) {
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
            {/* =========== ERRORS =========== */}
            {educationTermsData?.status === "error" && (
                <div className={styles.errorContainer}>
                    <ErrorText text={state?.errors?.commonError} />
                </div>
            )}
            {lessonsData?.status === "error" && (
                <div className={styles.errorContainer}>
                    <ErrorText text={state?.errors?.commonError} />
                </div>
            )}
            {state?.errors && state?.errors?.commonError && (
                <div className={styles.errorContainer}>
                    <ErrorText text={state?.errors?.commonError} />
                </div>
            )}
            {/* ====================== INPUTS ====================== */}
            <div className={styles.inputsContainer}>
                {/* =========== LESSONS MULTIPLE SELECTION =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="lessonIdList" className={styles.label}>
                        Lessons
                    </label>
                    <MultiSelect
                        data={extractLessons(lessonsData)}
                        name="lessonIdList"
                        title="Lessons"
                    />
                    {state?.errors && state?.errors.lessonIdList && (
                        <span className={styles.error}>
                            {state?.errors.lessonIdList}
                        </span>
                    )}
                </div>
                {/* =========== EDUCATION TERMS =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="educationTermId" className={styles.label}>
                        Education Term
                    </label>
                    <select
                        name="educationTermId"
                        id="educationTermId"
                        className={styles.input}>
                        <option value="">Select an education term</option>
                        {educationTermsData?.status !== "error" &&
                            extractEducationTerms(educationTermsData).map(
                                (item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                )
                            )}
                    </select>
                    {state?.errors && state?.errors.educationTermId && (
                        <span className={styles.error}>
                            {state?.errors.educationTermId}
                        </span>
                    )}
                </div>
                {/* =========== DAY =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="day" className={styles.label}>
                        Day
                    </label>
                    <select name="day" id="day" className={styles.input}>
                        <option value="">Select a day</option>
                        {weekdays.map((weekday) => (
                            <option key={weekday._id} value={weekday.value}>
                                {weekday.label}
                            </option>
                        ))}
                    </select>
                    {state?.errors && state?.errors.educationTermId && (
                        <span className={styles.error}>
                            {state?.errors.educationTermId}
                        </span>
                    )}
                </div>
                {/* =========== FORM DATA =========== */}
                {lessonProgramManagementFormData.map((item) => (
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
            {/* =========== SUBMIT BUTTON =========== */}
            <div className={styles.submitContainer}>
                <SubmitButton title="Create" loadingText="Creating" />
            </div>
        </form>
    );
}
