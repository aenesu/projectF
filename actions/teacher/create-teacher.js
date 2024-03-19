"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";

/**
 * Create a teacher as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {*} payload
 *
 * @example
 *
 * const payload = {
 *      "birthDay": "yyyy-MM-dd",
 *      "birthPlace": String,
 *      "email": String,
 *      "gender": "MALE" | "FEMALE",
 *      "isAdvisorTeacher": Boolean,
 *      "lessonsIdList": [Number],
 *      "name": String,
 *      "password": String,
 *      "phoneNumber": String,
 *      "ssn": String,
 *      "surname": String,
 *      "username": String
 * }
 *
 * @returns
 */

export const createTeacher = async (payload) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/teachers/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
