"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Update a meeting as a user with "TEACHER" role
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

export const updateMeeting = async (payload, id) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/meet/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
