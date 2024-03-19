"use client";

import SubmitButton from "@/components/common/submit-button/submit-button";
import { useFormState } from "react-dom";
import studentFormData from "@/data/student-form.json";
import genderOptions from "@/data/gender-options.json";
import ErrorText from "@/components/common/error-text/error-text";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import { createStudentAction } from "@/actions/student/create-student-action";
import styles from "./meeting-management-form.module.scss";

export default function MeetingManagementForm({ data }) {
    const [state, dispatch] = useFormState(createStudentAction, {
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
                {/* GENDER */}
                <div className={styles.inputGroup}>
                    <label htmlFor="gender" className={styles.label}>
                        Gender
                    </label>
                    <select name="gender" id="gender" className={styles.select}>
                        {genderOptions.map((item) => (
                            <option key={item._id} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {state?.errors && state?.errors?.gender && (
                        <span className={styles.error}>
                            {state?.errors?.gender}
                        </span>
                    )}
                </div>
                {/* ADVISOR TEACHER */}
                <div className={styles.inputGroup}>
                    <label htmlFor="advisorTeacherId" className={styles.label}>
                        Advisor Teacher
                    </label>
                    <select
                        className={styles.select}
                        id="advisorTeacherId"
                        name="advisorTeacherId">
                        {data &&
                            data?.status !== "error" &&
                            data.map((item) => (
                                <option
                                    key={item.advisorTeacherId}
                                    value={item.advisorTeacherId}>
                                    {item.teacherName} {item.teacherSurname}
                                </option>
                            ))}
                    </select>
                    {state?.errors && state?.errors?.advisorTeacherId && (
                        <span className={styles.error}>
                            {state?.errors?.advisorTeacherId}
                        </span>
                    )}
                </div>
                {studentFormData.map((item) => (
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
