"use client";

import { useFormState } from "react-dom";
import { createMeetingAction } from "@/actions/meeting/create-meeting-action";
import ErrorText from "@/components/common/error-text/error-text";
import { extractStudentInformation } from "@/utils/functions/extract-student-information";
import meetingFormData from "@/data/meeting-management-form.json";
import MultiSelect from "@/components/common/multi-select/multi-select";
import SubmitButton from "@/components/common/submit-button/submit-button";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import styles from "./meeting-management-form.module.scss";

export default function MeetingManagementForm({ studentsData }) {
    const [state, dispatch] = useFormState(createMeetingAction, {
        status: "",
        message: null,
        errors: {},
    });

    if (state?.status === "error") {
        swalToast(state?.message, "error", 3000);
    }

    return (
        <form action={dispatch} className={styles.formContainer}>
            {studentsData?.status === "error" && (
                <div className={styles.errorContainer}>
                    <ErrorText text={studentsData?.status?.message} />
                </div>
            )}
            {state?.errors && state?.errors?.commonError && (
                <div className={styles.errorContainer}>
                    <ErrorText text={state?.errors?.commonError} />
                </div>
            )}
            <div className={styles.inputsContainer}>
                {/* STUDENTS MULTI SELECTION */}
                <div className={styles.inputGroup}>
                    <label htmlFor="studentIds" className={styles.label}>
                        Students
                    </label>
                    <MultiSelect
                        data={extractStudentInformation(studentsData)}
                        name="studentIds"
                        title="Students"
                    />
                    {state?.errors && state?.errors?.studentIds && (
                        <span className={styles.error}>
                            {state?.errors?.studentIds}
                        </span>
                    )}
                </div>
                {meetingFormData.map((item) => (
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
