"use client";

import { useFormState } from "react-dom";
import { createStudentInformationAction } from "@/actions/student-information/create-student-information-action";
import ErrorText from "@/components/common/error-text/error-text";
import { extractEducationTerms } from "@/utils/functions/extract-education-terms";
import { extractLessons } from "@/utils/functions/extract-lessons";
import { extractStudentInformation } from "@/utils/functions/extract-student-information";
import studentInformationFormData from "@/data/student-information-form.json";
import SubmitButton from "@/components/common/submit-button/submit-button";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import styles from "./student-information-management-form.module.scss";

export default function StudentInformationManagementForm({
    educationTermsData,
    lessonsData,
    studentsData,
}) {
    const [state, dispatch] = useFormState(createStudentInformationAction, {
        status: "",
        message: null,
        errors: {},
    });

    if (state?.status === "error") {
        swalToast(state?.message, "error", 3000);
    }

    return (
        <form action={dispatch} className={styles.formContainer}>
            {educationTermsData?.status === "error" && (
                <div className={styles.errorContainer}>
                    <ErrorText text={educationTermsData?.message} />
                </div>
            )}
            {lessonsData?.status === "error" && (
                <div className={styles.errorContainer}>
                    <ErrorText text={lessonsData?.message} />
                </div>
            )}
            {studentsData?.status === "error" && (
                <div className={styles.errorContainer}>
                    <ErrorText text={studentsData?.message} />
                </div>
            )}
            {state?.errors && state?.errors?.commonError && (
                <div className={styles.errorContainer}>
                    <ErrorText text={state?.errors?.commonError} />
                </div>
            )}
            <div className={styles.inputsContainer}>
                {/* STUDENT SELECTION */}
                <div className={styles.inputGroup}>
                    <label htmlFor="studentId" className={styles.label}>
                        Student
                    </label>
                    <select
                        className={styles.input}
                        name="studentId"
                        id="studentId"
                        title="Students">
                        <option value="">Select a student</option>
                        {extractStudentInformation(studentsData)?.map(
                            (item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            )
                        )}
                    </select>
                    {state?.errors && state?.errors?.studentId && (
                        <span className={styles.error}>
                            {state?.errors?.studentId}
                        </span>
                    )}
                </div>
                {/* EDUCATION TERM SELECTION */}
                <div className={styles.inputGroup}>
                    <label htmlFor="educationTermId" className={styles.label}>
                        Education Term
                    </label>
                    <select
                        className={styles.input}
                        name="educationTermId"
                        id="educationTermId"
                        title="Students">
                        <option value="">Select an education term...</option>
                        {extractEducationTerms(educationTermsData)?.map(
                            (item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            )
                        )}
                    </select>
                    {state?.errors && state?.errors?.educationTermId && (
                        <span className={styles.error}>
                            {state?.errors?.educationTermId}
                        </span>
                    )}
                </div>
                {/* LESSON SELECTION */}
                <div className={styles.inputGroup}>
                    <label htmlFor="lessonId" className={styles.label}>
                        Lesson
                    </label>
                    <select
                        className={styles.input}
                        name="lessonId"
                        id="lessonId"
                        title="Students">
                        <option value="">Select an education term...</option>
                        {extractLessons(lessonsData)?.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {state?.errors && state?.errors?.lessonId && (
                        <span className={styles.error}>
                            {state?.errors?.lessonId}
                        </span>
                    )}
                </div>
                {studentInformationFormData.map((item) => (
                    <div key={item._id} className={styles.inputGroup}>
                        <label htmlFor={item.name} className={styles.label}>
                            {item.label}
                        </label>
                        {item.type === "textarea" ? (
                            <textarea
                                className={`${styles.input} ${styles.textarea}`}
                                id={item.name}
                                name={item.name}
                                placeholder={item.placeholder}></textarea>
                        ) : (
                            <input
                                autoComplete={item.autoComplete}
                                className={styles.input}
                                id={item.name}
                                name={item.name}
                                placeholder={item.placeholder}
                                type={item.type}
                            />
                        )}
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
