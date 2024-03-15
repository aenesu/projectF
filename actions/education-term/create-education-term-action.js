"use server";

import { errorObject } from "@/utils/functions/error-object";
import { transformErrors } from "@/utils/functions/transform-errors";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createEducationTerm } from "@/actions/education-term/create-education-term";
import { newEducationTermSchema } from "@/utils/validations/new-education-term-schema";

export const createEducationTermAction = async (prevState, formData) => {
    const trimmedData = trimFormDataFields(formData);
    let check;

    try {
        const validatedData = newEducationTermSchema.safeParse(trimmedData);
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
            endDate: moment(validatedData.data.endDate).format("YYYY-MM-DD"),
            lastRegistrationDate: moment(
                validatedData.data.lastRegistrationDate
            ).format("YYYY-MM-DD"),
            startDate: moment(validatedData.data.startDate).format(
                "YYYY-MM-DD"
            ),
            term: validatedData.data.term,
        };

        const response = await createEducationTerm(payload);

        const data = await response.json();

        if (!response.ok) {
            return errorObject("Something went wrong!", {
                commonError: data.message
                    ? data.message
                    : "Some bad things happened while trying to create the education term.",
            });
        }

        check = true;
        return {
            status: "success",
            message: "Education term created successfully!",
            data: data,
        };
    } catch (error) {
        return errorObject("Something went wrong!", {
            commonError: error.message,
        });
    } finally {
        if (check) {
            revalidatePath("/dashboard/manage/education-term");
            redirect("/dashboard/manage/education-term");
        }
    }
};
