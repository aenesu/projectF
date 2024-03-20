"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get the students as a user with "TEACHER" role
 *
 * @returns
 */

export const getStudents = async () => {
    const session = await auth();

    try {
        const response = await fetch(`${BASE_URL}/students/getAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (!response.ok) {
            return errorObject(
                "An error occurred while fetching the student data"
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject("An error occurred while fetching the student data");
    }
};
