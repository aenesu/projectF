"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";

/**
 * Create a student information as a user with "TEACHER" role
 *
 * @param {*} payload
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

export const createStudentInformation = async (payload) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/studentInfo/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
