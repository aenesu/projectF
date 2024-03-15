"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Create a manager as a user with "ADMIN" role
 *
 * @param {*} payload
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
 *
 * @returns
 */

export const createManager = async (payload) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/dean/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
