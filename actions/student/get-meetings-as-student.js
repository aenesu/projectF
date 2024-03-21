"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get all meetings as a user with "STUDENT" role
 *
 * @returns
 */

export const getMeetingsAsStudent = async () => {
    const session = await auth();

    try {
        const response = await fetch(`${BASE_URL}/meet/getAllMeetByStudent`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (!response.ok) {
            return errorObject(
                "An error occurred while fetching the meeting data"
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject("An error occurred while fetching the meeting data");
    }
};
