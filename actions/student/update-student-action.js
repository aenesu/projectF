"use server";

import moment from "moment";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { errorObject } from "@/utils/functions/error-object";
import { newStudentSchema } from "@/utils/validations/new-student-schema";
import { transformErrors } from "@/utils/functions/transform-errors";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { updateStudent } from "@/actions/student/update-student";

export const updateStudentAction = async (prevState, formData) => {
    const trimmedData = trimFormDataFields(formData);
    let check = false;

    const { id } = trimmedData;

    try {
        const validatedData = newStudentSchema.safeParse(trimmedData);
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

        const response = await updateStudent(payload, id);

        const data = await response.json();

        if (!response.ok) {
            return errorObject("Something went wrong!", {
                commonError: data.message
                    ? data.message
                    : "Some bad things happened while trying to update the student.",
            });
        }

        check = true;
        return {
            status: "success",
            message: "Student updated successfully!",
            data: data,
        };
    } catch (error) {
        return errorObject("Something went wrong!", {
            commonError: error.message,
        });
    } finally {
        if (check) {
            revalidatePath("/dashboard/manage/student");
            redirect("/dashboard/manage/student");
        }
    }
};
