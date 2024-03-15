"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";
import { revalidatePath } from "next/cache";

/**
 * Delete a lesson as a user with "ADMIN" | "ASSISTANTMANAGER" role
 * @param id
 * @returns
 */

export const deleteLesson = async (id) => {
    if (!id) throw Error("ID is missing!");

    const session = await auth();

    let check = false;

    try {
        const response = await fetch(`${BASE_URL}/lessons/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (!response.ok) {
            return errorObject(
                "Some bad things happened while trying to delete the lesson."
            );
        }

        check = true;

        return {
            status: "success",
            message: "Lesson deleted successfully!",
        };
    } catch (error) {
        return errorObject("An error occurred while deleting the lesson");
    } finally {
        if (check) {
            revalidatePath("/dashboard/manage/lesson");
        }
    }
};
