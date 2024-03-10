"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";

/**
 * Create an admin as a user with admin role
 *
 * @param {*} payload
 * @returns
 */

export const createAdmin = async (payload) => {
    const session = await auth();

    const response = await fetch(`${BASE_URL}/admin/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
    });

    return response;
};
