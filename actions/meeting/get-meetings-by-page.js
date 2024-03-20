"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get all meetings as a user with "TEACHER" role
 *
 * @param {number} page
 * @param {number} size
 * @param {string} sort
 * @param {string} type
 * @returns
 */

export const getMeetingsByPage = async (
    page = 0,
    size = 20,
    sort = "date",
    type = "asc"
) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${BASE_URL}/meet/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
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
                "An error occurred while fetching the meetings data"
            );
        }

        return data;
    } catch (error) {
        return errorObject(
            "An error occurred while fetching the meetings data"
        );
    }
};
