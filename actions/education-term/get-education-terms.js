"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get all education terms as a user with "ADMIN" | "ASSISTANTMANAGER" | "TEACHER" role
 *
 * @returns
 */

export const getEducationTerms = async () => {
    const session = await auth();

    try {
        const response = await fetch(`${BASE_URL}/educationTerms/getAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (!response.ok) {
            return errorObject(
                "An error occurred while fetching the education term data"
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject(
            "An error occurred while fetching the education term data"
        );
    }
};
