"use client";

import SubmitButton from "@/components/common/submit-button/submit-button";
import { useFormState } from "react-dom";
import adminFormData from "@/data/admin-form.json";
import genderOptions from "@/data/gender-options.json";
import ErrorText from "@/components/common/error-text/error-text";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import { updateAssistantManagerAction } from "@/actions/assistant-manager/update-assistant-manager-action";
import styles from "./manager-form.module.scss";

export default function UpdateAssistantManagerForm({ data }) {
    const [state, dispatch] = useFormState(updateAssistantManagerAction, {
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
                        defaultValue={data?.object?.gender}>
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
                {/* FORM DATA */}
                {/* Send user id to the server action to update user with that id */}
                <input
                    type="hidden"
                    name="userId"
                    value={data?.object?.userId}
                />
                {adminFormData.map((item) => (
                    <div key={item._id} className={styles.inputGroup}>
                        <label htmlFor={item.name} className={styles.label}>
                            {item.label}
                        </label>
                        <input
                            autoComplete={item.autoComplete}
                            className={styles.input}
                            defaultValue={data?.object?.[item.name] || ""}
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
