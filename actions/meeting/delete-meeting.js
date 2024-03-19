"use server";
import { auth } from "@/auth";
import { BASE_URL } from "@/actions/base-url";
import { errorObject } from "@/utils/functions/error-object";
import { revalidatePath } from "next/cache";

/**
 * Delete a meeting as a user with "TEACHER" role
 * @param {string | number} id
 * @returns
 */

export const deleteMeeting = async (id) => {
    if (!id) throw Error("ID is missing!");

    const session = await auth();

    let check = false;

    try {
        const response = await fetch(`${BASE_URL}/meet/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (!response.ok) {
            return errorObject(
                "Some bad things happened while trying to delete the meeting."
            );
        }

        // the following line will throw an error because the response is not a JSON object
        // const data = await response.json();

        check = true;

        return {
            status: "success",
            message: "Meeting deleted successfully!",
        };
    } catch (error) {
        return errorObject("An error occurred while deleting the meeting");
    } finally {
        if (check) {
            revalidatePath("/dashboard/manage/meeting");
        }
    }
};
