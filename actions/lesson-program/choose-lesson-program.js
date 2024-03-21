"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Choose a lesson program as a user with "STUDENT" role
 *
 * @param {*} payload
 *
 * @example
 * {
 *  "lessonProgramId": [ 0 ]
 * }
 */

export const chooseLessonProgram = async (payload) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/students/chooseLesson`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
