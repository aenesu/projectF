"use server";

import { errorObject } from "@/utils/functions/error-object";
import { transformErrors } from "@/utils/functions/transform-errors";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { newStudentSchema } from "@/utils/validations/new-student-schema";
import { createStudent } from "@/actions/student/create-student";

export const createStudentAction = async (prevState, formData) => {
    const trimmedData = trimFormDataFields(formData);
    let check = false;

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

        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, birthDay, ...rest } = validatedData.data;

        const payload = {
            ...rest,
            birthDay: moment(birthDay).format("YYYY-MM-DD"),
        };

        const response = await createStudent(payload);

        const data = await response.json();

        if (!response.ok) {
            return errorObject("Something went wrong!", {
                commonError: data?.message
                    ? data?.message
                    : "Some bad things happened while trying to create student.",
            });
        }

        check = true;
        return {
            status: "success",
            message: "Student created successfully!",
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
