"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";

/**
 * Create a student as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {*} payload
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

export const createStudent = async (payload) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/students/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
