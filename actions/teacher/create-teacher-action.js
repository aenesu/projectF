"use server";

import moment from "moment";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createTeacher } from "@/actions/teacher/create-teacher";
import { errorObject } from "@/utils/functions/error-object";
import { newTeacherSchema } from "@/utils/validations/new-teacher-schema";
import { transformErrors } from "@/utils/functions/transform-errors";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";

export const createTeacherAction = async (prevState, formData) => {
    const trimmedData = trimFormDataFields(formData);
    let check = false;

    const updatedFormData = {
        ...trimmedData,
        isAdvisorTeacher: trimmedData.isAdvisorTeacher === "on" ? true : false,
        lessonsIdList: trimmedData.lessonsIdList
            ? [...trimmedData.lessonsIdList.split(",")]
            : [],
    };

    try {
        const validatedData = newTeacherSchema.safeParse(updatedFormData);
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

        const response = await createTeacher(payload);

        const data = await response.json();

        if (!response.ok) {
            return errorObject("Something went wrong!", {
                commonError: data?.message
                    ? data?.message
                    : "Some bad things happened while trying to create teacher.",
            });
        }

        check = true;
        return {
            status: "success",
            message: "Teacher created successfully!",
            data: data,
        };
    } catch (error) {
        return errorObject("Something went wrong!", {
            commonError: error.message,
        });
    } finally {
        if (check) {
            revalidatePath("/dashboard/manage/teacher");
            redirect("/dashboard/manage/teacher");
        }
    }
};
