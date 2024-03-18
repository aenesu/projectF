"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Update a teacher as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {*} payload
 * @param {string | number} id
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

export const updateTeacher = async (payload, id) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/teachers/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
