import { z } from "zod";
import { lowercaseRegex } from "@/utils/regex/lowercase-regex";
import { uppercaseRegex } from "@/utils/regex/uppercase-regex";
import { numbersRegex } from "@/utils/regex/numbers-regex";
import { phoneRegex } from "@/utils/regex/phone-regex";
import { ssnRegex } from "@/utils/regex/ssn-regex";

export const newTeacherSchema = z
    .object({
        birthDay: z.coerce
            .date()
            .min(new Date("1900-01-01"), { message: "Choose a newer date" })
            .max(new Date("2019-01-01"), { message: "Choose an older date!" }),
        birthPlace: z
            .string()
            .min(1, { message: "Place of birth is required" })
            .max(16, { message: "Place of birth is too long" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirm your password" }),
        email: z
            .string()
            .email({ message: "Invalid email" })
            .min(1, { message: "Email is required" }),
        gender: z.string().min(1, { message: "Please select a gender" }),
        lessonsIdList: z
            .string()
            .array()
            .nonempty({ message: "Select at least one lesson program" }),
        name: z.string().min(1, { message: "Name is required" }),
        password: z
            .string()
            .min(1, { message: "Password is required" })
            .regex(
                lowercaseRegex,
                "Password must contain at least one lowercase letter"
            )
            .regex(
                uppercaseRegex,
                "Password must contain at least one uppercase letter"
            )
            .regex(numbersRegex, "Password must contain at least one number"),
        phoneNumber: z
            .string()
            .min(1, { message: "Phone number is required" })
            .regex(
                phoneRegex,
                "Phone number must be in the following format: 123-456-7890"
            ),
        ssn: z
            .string()
            .min(1, { message: "SSN is required" })
            .regex(
                ssnRegex,
                "SSN must be in the following format: 123-45-6789"
            ),
        surname: z.string().min(1, { message: "Surname is required" }),
        username: z
            .string()
            .min(4, { message: "Username must be at least 4 characters" })
            .max(16, { message: "Username can be utmost 16 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
