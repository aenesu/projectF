"use server";

import { errorObject } from "@/utils/functions/error-object";
import { transformErrors } from "@/utils/functions/transform-errors";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { newAdminSchema } from "@/utils/validations/new-admin-schema";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createManager } from "@/actions/manager/create-manager";

export const createManagerAction = async (prevState, formData) => {
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

        const response = await createManager(payload);

        const data = await response.json();

        if (!response.ok) {
            return errorObject("Something went wront!", {
                commonError: response.message
                    ? response.message
                    : "Some bad things happened while trying to create the manager.",
            });
        }

        check = true;
        return {
            status: "success",
            message: "Manager created successfully!",
            data: data,
        };
    } catch (error) {
        return errorObject("Something went wrong!", {
            commonError: error.message,
        });
    } finally {
        if (check) {
            revalidatePath("/dashboard/manage/manager");
            redirect("/dashboard/manage/manager");
        }
    }
};
