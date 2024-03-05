"use server";

import { signOut } from "@/auth";

/**
 * Logs the user out.
 * @returns {Promise<void>}
 */

export const logout = async () => {
    try {
        await signOut({ redirectTo: "/login" });
    } catch (error) {
        throw error;
    }
};
