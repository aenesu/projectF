"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get an assistant manager by ID as a user with "ADMIN" | "MANAGER" role
 * @param id
 * @returns
 */

export const getAssistantManagerById = async (id) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${BASE_URL}/vicedean/getViceDeanById/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return errorObject(
                "Some bad things happened while trying to get the assistant manager.",
                { commonError: data?.message }
            );
        }

        return data;
    } catch (error) {
        return errorObject(
            "Some bad things happened while trying to get the assistant manager.",
            { commonError: error.message }
        );
    }
};
