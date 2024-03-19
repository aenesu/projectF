"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Get a student information by id as a user with "TEACHER" role
 *
 * @param {string | number} id
 * @returns
 *
 */

export const getStudentInformationById = async (id) => {
    const session = await auth();

    try {
        const response = await fetch(`${BASE_URL}/studentInfo/get/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return errorObject(
                "Some bad things happened while trying to get the student information.",
                { commonError: data?.message }
            );
        }

        return data;
    } catch (error) {
        return errorObject(
            "Some bad things happened while trying to get the student information.",
            { commonError: error.message }
        );
    }
};
