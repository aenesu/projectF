"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Update a student information by id as a user with "TEACHER" role
 *
 * @param {*} payload
 * @param {string | number} id
 *
 * @example
 *
 * const payload = {
 *      "absentee": Number,
 *      "educationTermId": Number,
 *      "finalExam": Number,
 *      "infoNote": String,
 *      "lessonId": Number,
 *      "midtermExam": Number,
 *      "studentId": Number
 * }
 *
 * @returns
 */

export const updateStudentInformation = async (payload, id) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/studentInfo/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
