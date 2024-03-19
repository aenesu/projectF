"use client";

import { useFormState } from "react-dom";
import studentFormData from "@/data/student-form.json";
import ErrorText from "@/components/common/error-text/error-text";
import genderOptions from "@/data/gender-options.json";
import SubmitButton from "@/components/common/submit-button/submit-button";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import { updateStudentAction } from "@/actions/student/update-student-action";
import styles from "./update-student-management-form.module.scss";

export default function UpdateStudentManagementForm({
    advisorTeacherData,
    data,
}) {
    const [state, dispatch] = useFormState(updateStudentAction, {
        status: "",
        message: null,
        errors: {},
    });

    if (state?.status === "error") {
        swalToast(state?.message, "error", 3000);
    }

    return (
        <form action={dispatch} className={styles.formContainer}>
            {/* IF THERE WAS A PROBLEM FETCHING USER DATA */}
            {data?.status === "error" && (
                <div className={styles.errorContainer}>
                    <ErrorText
                        text={data?.errors?.commonError || data?.message}
                    />
                </div>
            )}
            {/* IF THERE WAS A PROBLEM WITH THE FORM */}
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
                    <select
                        name="gender"
                        id="gender"
                        className={styles.select}
                        defaultValue={data?.gender}>
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
                        name="advisorTeacherId"
                        id="advisorTeacherId"
                        className={styles.select}
                        defaultValue={data?.advisorTeacherId}>
                        {advisorTeacherData.map((item) => (
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
                {/* FORM DATA */}
                {/* Send user id to the server action to update user with that id */}
                <input type="hidden" name="id" value={data?.id} />
                {studentFormData.map((item) => (
                    <div key={item._id} className={styles.inputGroup}>
                        <label htmlFor={item.name} className={styles.label}>
                            {item.label}
                        </label>
                        <input
                            autoComplete={item.autoComplete}
                            className={styles.input}
                            defaultValue={data?.[item.name] || ""}
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
                <SubmitButton title="Update" loadingText="Updating" />
            </div>
        </form>
    );
}
