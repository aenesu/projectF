"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get all lessons by page as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {number} page
 * @param {number} size
 * @param {string} sort
 * @param {string} type
 * @returns
 */

export const getLessonsByPage = async (
    page = 0,
    size = 20,
    sort = "lessonName",
    type = "asc"
) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${BASE_URL}/lessons/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
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
                "An error occurred while fetching the lesson data"
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject("An error occurred while fetching the lesson data");
    }
};
