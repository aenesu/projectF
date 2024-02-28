"use server";
import { BASE_URL } from "@/actions/base-url";

export const login = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) return null;

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};
