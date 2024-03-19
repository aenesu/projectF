"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get all student informations by page as a user with "TEACHER" role
 *
 * @param {number} page
 * @param {number} size
 *
 * @returns
 *
 */

export const getStudentInformationByPageAsTeacher = async (
    page = 0,
    size = 20
) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${BASE_URL}/studentInfo/getAllForTeacher?page=${page}&size=${size}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            }
        );
        if (!response.ok) {
            return errorObject(
                "An error occurred while fetching the student information data"
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject(
            "An error occurred while fetching the student information data"
        );
    }
};
