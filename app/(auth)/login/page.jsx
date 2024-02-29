"use client";

import SubmitButton from "@/components/common/submit-button/submit-button";
import ErrorText from "@/components/common/error-text/error-text";
import { useFormState } from "react-dom";
import { loginFormAction } from "@/actions/auth/login-form-action";
import styles from "./login-page.module.scss";

export default function LoginPage() {
    const [state, dispatch] = useFormState(loginFormAction, {
        message: null,
        errors: {},
    });

    return (
        <form action={dispatch} className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="username" className={styles.label}>
                    Username
                </label>
                <input
                    autoComplete="username"
                    className={styles.input}
                    id="username"
                    name="username"
                    placeholder="Enter your username..."
                    type="text"
                />
                {state?.errors?.username && (
                    <p className={styles.error}>{state?.errors?.username}</p>
                )}
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                    Password
                </label>
                <input
                    autoComplete="current-password"
                    className={styles.input}
                    id="password"
                    name="password"
                    placeholder="•••••••••"
                    type="password"
                />
                {state?.errors?.password && (
                    <p className={styles.error}>{state?.errors?.password}</p>
                )}
            </div>
            {state?.errors?.commonError && (
                <ErrorText text={state?.errors?.commonError} />
            )}
            <SubmitButton title="Sign In" loadingText="Signing In" />
        </form>
    );
}
