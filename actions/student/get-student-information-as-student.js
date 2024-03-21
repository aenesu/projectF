"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get the student information as a user with "STUDENT" role
 *
 * @param {number | string} page
 * @param {number | string} size
 *
 * @returns
 */

export const getStudentInformationAsStudent = async (page = 0, size = 20) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${BASE_URL}/studentInfo/getAllByStudent?page=${page}&size=${size}`,
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
                "An error occurred while fetching the student information for student"
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject(
            "An error occurred while fetching the student information for student"
        );
    }
};
