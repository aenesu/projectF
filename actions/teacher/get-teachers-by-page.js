"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get all teachers as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {number} page
 * @param {number} size
 * @param {string} sort
 * @param {string} type
 * @returns
 */

export const getTeachersByPage = async (
    page = 0,
    size = 20,
    sort = "name",
    type = "desc"
) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${BASE_URL}/teachers/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
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
                "An error occurred while fetching the teacher data"
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject("An error occurred while fetching the teacher data");
    }
};
