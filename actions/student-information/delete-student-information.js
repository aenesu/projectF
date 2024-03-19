"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Delete a student information as a user with "TEACHER" role
 *
 * @param {string | number} id
 * @returns
 */

export const deleteStudentInformation = async (id) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/studentInfo/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    return response;
};
