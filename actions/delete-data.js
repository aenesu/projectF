"use server";
import { BASE_URL } from "@/actions/base-url";
import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";
import { revalidatePath } from "next/cache";

export const deleteData = async ({ endpoint, id, title, pathname }) => {
    if (!id) throw Error("ID is missing!");

    const session = await auth();

    let check = false;

    try {
        const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        if (!response.ok) {
            return errorObject(
                `Some bad things happened while trying to delete the ${title}.`
            );
        }

        check = true;

        return {
            status: "success",
            message: `${title} deleted successfully!`,
        };
    } catch (error) {
        return errorObject(`An error occurred while deleting the ${title}`);
    } finally {
        if (check) {
            revalidatePath(pathname);
        }
    }
};
