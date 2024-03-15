"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Create a lesson as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {*} payload
 *
 * @example
 *
 * const payload = {
 *          "compulsory": true | false,
 *          "creditScore": number,
 *          "lessonName": string
 * }
 *
 * @returns
 */

export const createLesson = async (payload) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/lessons/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
