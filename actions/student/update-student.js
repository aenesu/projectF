"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Update a student as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {*} payload
 * @param {string | number} id
 *
 * @example
 *
 * const payload = {
 *      "advisorTeacherId": Number,
 *      "birthDay": "yyyy-MM-dd",
 *      "birthPlace": String,
 *      "email": String,
 *      "fatherName": String,
 *      "gender": "MALE" | "FEMALE",
 *      "motherName": String,
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

export const updateStudent = async (payload, id) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/students/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
