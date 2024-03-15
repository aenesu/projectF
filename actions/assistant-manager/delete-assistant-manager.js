"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";
import { revalidatePath } from "next/cache";

/**
 * Delete an assistant manager as a user with "ADMIN" | "MANAGER" role
 * @param {string | number} id
 * @returns
 */


export const deleteAssistantManager = async (id) => {
    if (!id) throw Error("ID is missing!");

    const session = await auth();

    let check = false;

    try {
        const response = await fetch(`${BASE_URL}/vicedean/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (!response.ok) {
            return errorObject(
                "Some bad things happened while trying to delete the assistant manager."
            );
        }

        // the following line will throw an error because the response is not a JSON object
        // const data = await response.json();

        check = true;

        return {
            status: "success",
            message: "Assistant manager deleted successfully!",
        };
    } catch (error) {
        return errorObject(
            "An error occurred while deleting the assistant manager"
        );
    } finally {
        if (check) {
            revalidatePath("/dashboard/manage/assistant-manager");
        }
    }
};
