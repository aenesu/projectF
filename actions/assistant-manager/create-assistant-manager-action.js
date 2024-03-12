"use server";

import { errorObject } from "@/utils/functions/error-object";
import { transformErrors } from "@/utils/functions/transform-errors";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { newAdminSchema } from "@/utils/validations/new-admin-schema";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAssistantManager } from "@/actions/assistant-manager/create-assistant-manager";

export const createAssistantManagerAction = async (prevState, formData) => {
    const trimmedData = trimFormDataFields(formData);
    let check;

    try {
        const validatedData = newAdminSchema.safeParse(trimmedData);
        if (!validatedData.success) {
            const errors = validatedData.error.issues
                ? transformErrors(validatedData.error.issues)
                : { commonError: validatedData.error.message };

            return errorObject(
                "Validation Failed! Please check the errors and try again.",
                errors
            );
        }

        const payload = {
            ...validatedData.data,
            birthDay: moment(validatedData.data.birthDay).format("YYYY-MM-DD"),
        };

        const response = await createAssistantManager(payload);

        const data = await response.json();

        if (!response.ok) {
            return errorObject("Something went wrong!", {
                commonError: data.message
                    ? data.message
                    : "Some bad things happened while trying to create the assistant manager.",
            });
        }

        check = true;
        return {
            status: "success",
            message: "Assistant manager created successfully!",
            data: data,
        };
    } catch (error) {
        return errorObject("Something went wrong!", {
            commonError: error.message,
        });
    } finally {
        if (check) {
            revalidatePath("/dashboard/manage/assistant-manager");
            redirect("/dashboard/manage/assistant-manager");
        }
    }
};
