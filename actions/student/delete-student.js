"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";
import { revalidatePath } from "next/cache";

/**
 * Delete a student as a user with "ADMIN" | "ASSISTANTMANAGER" role
 * @param {string | number} id
 * @returns
 */

export const deleteStudent = async (id) => {
    if (!id) throw Error("ID is missing!");

    const session = await auth();

    let check = false;

    try {
        const response = await fetch(`${BASE_URL}/students/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (!response.ok) {
            return errorObject(
                "Some bad things happened while trying to delete the student."
            );
        }

        // the following line will throw an error because the response is not a JSON object
        // const data = await response.json();

        check = true;

        return {
            status: "success",
            message: "Student deleted successfully!",
        };
    } catch (error) {
        return errorObject("An error occurred while deleting the student");
    } finally {
        if (check) {
            revalidatePath("/dashboard/manage/student");
        }
    }
};
