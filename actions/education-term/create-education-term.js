"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Create an education term as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {*} payload
 *
 * @example
 *
  * const payload = {
 *      "endDate": "yyyy-MM-dd",
 *      "lastRegistrationDate": "yyyy-MM-dd",
 *      "startDate": "yyyy-MM-dd",
 *      "term": "FALL_SEMESTER"
 * }
 *
 * @returns
 */

export const createEducationTerm = async (payload) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/educationTerms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
