"use server";

import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_PAGE } from "@/routes";
import { transformErrors } from "@/utils/functions/transform-errors";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { loginSchema } from "@/utils/validations/login-schema";
import { AuthError } from "next-auth";

export const loginFormAction = async (prevState, formData) => {
    const trimmedData = trimFormDataFields(formData);

    try {
        const validatedData = loginSchema.safeParse(trimmedData);
        if (!validatedData.success) {
            return {
                message: "Invalid form data",
                errors: validatedData.error.issues
                    ? transformErrors(validatedData.error.issues)
                    : { commonError: validatedData.error.message },
            };
        }

        await signIn("credentials", {
            username: validatedData.data.username,
            password: validatedData.data.password,
            // after a successful login, redirect the user to the default redirect page
            redirectTo: DEFAULT_REDIRECT_PAGE,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: "Invalid username or password",
                        errors: { commonError: "Invalid username or password" },
                    };
                default:
                    return {
                        message: "Something went wrong!",
                        errors: { commonError: error.message },
                    };
            }
        }

        throw error;
    }
};
