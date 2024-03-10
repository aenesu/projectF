"use client";

import SubmitButton from "@/components/common/submit-button/submit-button";
import styles from "./admin-form.module.scss";
import { useFormState } from "react-dom";
import adminFormData from "@/data/admin-form.json";
import genderOptions from "@/data/gender-options.json";
import ErrorText from "@/components/common/error-text/error-text";
import { createAdminAction } from "@/actions/admin/create-admin-action";

export default function AdminForm() {
    const [state, dispatch] = useFormState(createAdminAction, {
        status: "",
        message: null,
        errors: {},
    });

    const errors = {
        name: "Name is required",
        password: "Password is required",
        commonError: "Something went wrong",
    };

    return (
        <form className={styles.formContainer}>
            {errors && errors.commonError && (
                <div className={styles.errorContainer}>
                    <ErrorText text={errors.commonError} />
                </div>
            )}
            <div className={styles.inputsContainer}>
                {adminFormData.map((item) => (
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
                        {errors && errors[item.name] && (
                            <span>{errors[item.name]}</span>
                        )}
                    </div>
                ))}
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
                    {errors && errors.gender && <span>{errors.gender}</span>}
                </div>
            </div>
            <div className={styles.submitContainer}>
                <SubmitButton title="Create" loadingText="Creating" />
            </div>
        </form>
    );
}
