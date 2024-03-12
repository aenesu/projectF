"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";

/**
 * Get a manager by ID as a user with "ADMIN" role
 * @param id
 * @returns
 */

export const getManagerById = async (id) => {
    const session = await auth();

    try {
        const response = await fetch(`${BASE_URL}/dean/getManagerById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return errorObject(
                "Some bad things happened while trying to get the manager.",
                { commonError: data?.message }
            );
        }

        return data;
    } catch (error) {
        return errorObject(
            "Some bad things happened while trying to get the manager.",
            { commonError: error.message }
        );
    }
};
