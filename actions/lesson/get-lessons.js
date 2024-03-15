"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get all lessons as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @returns
 */

export const getLessons = async () => {
    const session = await auth();

    try {
        const response = await fetch(`${BASE_URL}/lessons/getAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (!response.ok) {
            return errorObject(
                "An error occurred while fetching the lesson data"
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject("An error occurred while fetching the lesson data");
    }
};
