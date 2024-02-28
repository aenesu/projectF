"use client"

import SubmitButton from "@/components/common/submit-button/submit-button";
import styles from "./login-page.module.scss"; 
import ErrorText from "@/components/common/error-text/error-text";



export default function LoginPage() {

  const error = true;

  return (
    <form className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="username">Username</label>
        <input 
          autoComplete="username"
          className={styles.input}
          id="username"
          placeholder="Enter your username"
          type="text"
        />
        {error && <p className={styles.error}>Username is required</p>}
      </div>
      
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="password">Username</label>
        <input 
          autoComplete="current-password"
          className={styles.input}
          id="password"
          placeholder="•••••••••"
          type="text"
        />
        {error && <p className={styles.error}>Password is required</p>}
      </div>
      {error && <ErrorText text="Invalid credentials!" />}
      <SubmitButton title="Sign In" loadingText="Signing In" />
    </form>
  )
}
