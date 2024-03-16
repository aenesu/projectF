"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { errorObject } from "@/utils/functions/error-object";
import { newLessonProgramSchema } from "@/utils/validations/new-lesson-program-schema";
import { transformErrors } from "@/utils/functions/transform-errors";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { createLessonProgram } from "@/actions/lesson-program/create-lesson-program";

export const createLessonProgramAction = async (prevState, formData) => {
    const trimmedData = trimFormDataFields(formData);

    const updatedFormData = {
        ...trimmedData,
        lessonIdList: trimmedData.lessonIdList
            ? [...trimmedData.lessonIdList.split(",")]
            : [],
    };

    let check = false;

    try {
        const validatedData = newLessonProgramSchema.safeParse(updatedFormData);
        if (!validatedData.success) {
            const errors = validatedData.error.issues
                ? transformErrors(validatedData.error.issues)
                : { commonError: validatedData.error.message };

            return errorObject(
                "Validation Failed! Please check the errors and try again.",
                errors
            );
        }

        const response = await createLessonProgram(validatedData.data);

        const data = await response.json();

        if (!response.ok) {
            return errorObject("Something went wrong!", {
                commonError: data.message
                    ? data.message
                    : "Some bad things happened while trying to create the lesson program.",
            });
        }

        check = true;
        return {
            status: "success",
            message: "Lesson program created successfully!",
            data: data,
        };
    } catch (error) {
        return errorObject("Something went wrong!", {
            commonError: error.message,
        });
    } finally {
        if (check) {
            revalidatePath("/dashboard/manage/lesson-program");
            redirect("/dashboard/manage/lesson-program");
        }
    }
};
