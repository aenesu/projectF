"use client";

import { useFormState } from "react-dom";
import { createTeacherAction } from "@/actions/teacher/create-teacher-action";
import genderOptions from "@/data/gender-options.json";
import ErrorText from "@/components/common/error-text/error-text";
import MultiSelect from "@/components/common/multi-select/multi-select";
import teacherFormData from "@/data/teacher-form.json";
import SubmitButton from "@/components/common/submit-button/submit-button";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import styles from "./teacher-management-form.module.scss";

export default function TeacherManagementForm({ data }) {
    const [state, dispatch] = useFormState(createTeacherAction, {
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
                {/* LESSON PROGRAM MULTIPLE SELECTION */}
                <div className={styles.inputGroup}>
                    <label htmlFor="lessonsIdList" className={styles.label}>
                        Lesson Programs
                    </label>
                    <MultiSelect
                        data={data}
                        name="lessonsIdList"
                        title="Lesson Program"
                    />
                    {state?.errors && state?.errors?.lessonsIdList && (
                        <span className={styles.error}>
                            {state?.errors?.lessonsIdList}
                        </span>
                    )}
                </div>
                {teacherFormData.map((item) => (
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