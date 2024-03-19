"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";

/**
 * Create a meeting as a user with "TEACHER" role
 *
 * @param {*} payload
 * @param {*} id
 *
 * @example
 *
 * const payload = {
 *      "date": "yyyy-MM-dd",
 *      "description": String,
 *      "startTime": "HH:mm",
 *      "stopTime": "HH:mm",
 *      "studentIds": [Number]
 * }
 *
 * @returns
 */

export const createMeeting = async (payload) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/meet/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
