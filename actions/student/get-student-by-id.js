"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get a student by ID as a user with "ADMIN" | "ASSISTANTMANAGER" role
 * @param {string | number} id
 * @returns
 */

export const getStudentById = async (id) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${BASE_URL}/students/getStudentById?id=${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return errorObject(
                "Some bad things happened while trying to get the student.",
                { commonError: data?.message }
            );
        }

        return data;
    } catch (error) {
        return errorObject(
            "Some bad things happened while trying to get the student.",
            { commonError: error.message }
        );
    }
};
