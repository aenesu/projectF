"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get your own students as a user with "TEACHER" role
 *
 * @returns
 *
 */

export const getStudentsAsAdvisorTeacher = async () => {
    const session = await auth();

    try {
        const response = await fetch(`${BASE_URL}/students/getAllByAdvisor`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return errorObject(
                "Some bad things happened while trying to get the student information as teacher.",
                { commonError: data?.message }
            );
        }

        return data;
    } catch (error) {
        return errorObject("Something went wrong!", {
            commonError: error.message,
        });
    }
};
