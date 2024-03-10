import { z } from "zod";
import { lowercaseRegex } from "@/utils/regex/lowercase-regex";
import { uppercaseRegex } from "@/utils/regex/uppercase-regex";
import { numbersRegex } from "@/utils/regex/numbers-regex";
import { phoneRegex } from "@/utils/regex/phone-regex";
import { ssnRegex } from "@/utils/regex/ssn-regex";

export const newAdminSchema = z
    .object({
        birthDay: z.coerce
            .date()
            .min(new Date(1930, 1, 1), {
                message: "You have to be younger than 90 years old",
            })
            .max(new Date(2019, 1, 1), {
                message: "You have to be older than 5 years old",
            }),
        birthPlace: z
            .string()
            .min(1, { message: "Birth place is required" })
            .max(16, { message: "Birth place is too long" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirm password is required" }),
        gender: z.string().min(1, { message: "Please select a gender" }),
        name: z.string().min(1, { message: "Name is required" }),
        password: z
            .string()
            .min(1, { message: "Password is required" })
            .regex(lowercaseRegex, {
                message: "Password must contain at least one lowercase letter",
            })
            .regex(uppercaseRegex, {
                message: "Password must contain at least one uppercase letter",
            })
            .regex(numbersRegex, {
                message: "Password must contain at least one number",
            }),
        phoneNumber: z
            .string()
            .min(1, { message: "Phone number is required" })
            .regex(phoneRegex, { message: "Invalid phone number" }),
        ssn: z
            .string()
            .min(1, { message: "SSN is required" })
            .regex(ssnRegex, { message: "Invalid SSN" }),
        surname: z.string().min(1, { message: "Surname is required" }),
        username: z
            .string()
            .min(1, { message: "Username is required" })
            .min(4, { message: "Username must be at least 4 characters long" })
            .max(16, { message: "Username is too long" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
