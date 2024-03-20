"use client";

import { useFormState } from "react-dom";
import ErrorText from "@/components/common/error-text/error-text";
import { extractStudentInformation } from "@/utils/functions/extract-student-information";
import meetingFormData from "@/data/meeting-management-form.json";
import MultiSelect from "@/components/common/multi-select/multi-select";
import SubmitButton from "@/components/common/submit-button/submit-button";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import { updateMeetingAction } from "@/actions/meeting/update-meeting-action";
import styles from "./update-meeting-management-form.module.scss";

export default function UpdateMeetingManagementForm({ data, studentsData }) {
    const [state, dispatch] = useFormState(updateMeetingAction, {
        status: "",
        message: null,
        errors: {},
    });

    if (state?.status === "error") {
        swalToast(state?.message, "error", 3000);
    }

    return (
        <form action={dispatch} className={styles.formContainer}>
            {data?.status === "error" && (
                <div className={styles.errorContainer}>
                    <ErrorText text={data?.message} />
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
                <input type="hidden" name="id" value={data?.object?.id} />
                {/* STUDENTS MULTI SELECTION */}
                <div className={styles.inputGroup}>
                    <label htmlFor="studentIds" className={styles.label}>
                        Students
                    </label>
                    <MultiSelect
                        data={extractStudentInformation(studentsData)}
                        name="studentIds"
                        title="Students"
                        defaultValues={extractStudentInformation(
                            data?.object?.students
                        )}
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
                                defaultValue={data?.object[item.name]}
                                id={item.name}
                                name={item.name}
                                placeholder={item.placeholder}></textarea>
                        ) : (
                            <input
                                autoComplete={item.autoComplete}
                                className={styles.input}
                                defaultValue={data?.object[item.name]}
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
                <SubmitButton title="Update" loadingText="Updating" />
            </div>
        </form>
    );
}
