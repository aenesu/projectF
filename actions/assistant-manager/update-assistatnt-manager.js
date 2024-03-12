"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Update an assistant manager as a user with "ADMIN" | "MANAGER" role
 *
 * @param {object} payload
 * @param {string} id
 *
 * @example
 *
 * const payload = {
 *      "birthDay": "YYYY-MM-DD",
 *      "birthPlace": "string",
 *      "gender": "MALE" | "FEMALE",
 *      "name": "string",
 *      "password": "string",
 *      "phoneNumber": "string" (format: "XXX-XXX-XXXX"),
 *      "ssn": "string" (format: "XXX-XX-XXXX"),
 *      "surname": "string",
 *      "username": "string"
 * }
 * @returns
 */

export const updateAssistantManager = async (payload, id) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/vicedean/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
