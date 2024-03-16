"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Create a lesson program as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {*} payload
 *
 * @example
 *
 * const payload = {
 *      "day": "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY",
 *      "educationTermId": Number,
 *      "lessonIdList": [Number],
 *      "startTime": "HH:mm",
 *      "stopTime": "HH:mm"
 * }
 *
 * @returns
 */

export const createLessonProgram = async (payload) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/lessonPrograms/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
