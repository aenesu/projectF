"use server";

import { errorObject } from "@/utils/functions/error-object";
import { transformErrors } from "@/utils/functions/transform-errors";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { newAdminSchema } from "@/utils/validations/new-admin-schema";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateAssistantManager } from "@/actions/assistant-manager/update-assistant-manager";

export const updateAssistantManagerAction = async (prevState, formData) => {
    const trimmedData = trimFormDataFields(formData);
    let check;

    const { userId } = trimmedData;

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

        // remove the confirmPassword field from the payload
        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, ...restOfValidatedData } = validatedData.data;

        const payload = {
            ...restOfValidatedData,
            birthDay: moment(restOfValidatedData.birthDay).format("YYYY-MM-DD"),
        };

        const response = await updateAssistantManager(payload, userId);

        const data = await response.json();

        if (!response.ok) {
            return errorObject("Something went wrong!", {
                commonError: data.message
                    ? data.message
                    : "Some bad things happened while trying to update the assistant manager.",
            });
        }

        check = true;
        return {
            status: "success",
            message: "Assistant manager updated successfully!",
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
