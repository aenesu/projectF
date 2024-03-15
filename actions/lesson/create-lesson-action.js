"use server";

import { errorObject } from "@/utils/functions/error-object";
import { transformErrors } from "@/utils/functions/transform-errors";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createLesson } from "@/actions/lesson/create-lesson";
import { newLessonSchema } from "@/utils/validations/new-lesson-schema";

export const createLessonAction = async (prevState, formData) => {
    const trimmedData = trimFormDataFields(formData);

    const { compulsory, creditScore, lessonName } = trimmedData;

    const dataToValidate = {
        creditScore: +creditScore,
        lessonName: lessonName,
    };

    let check;

    try {
        const validatedData = newLessonSchema.safeParse(dataToValidate);
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
            compulsory: compulsory === "on" ? true : false,
            ...validatedData.data,
        };

        const response = await createLesson(payload);

        const data = await response.json();

        if (!response.ok) {
            return errorObject("Something went wrong!", {
                commonError: data.message
                    ? data.message
                    : "Some bad things happened while trying to create the lesson.",
            });
        }

        check = true;
        return {
            status: "success",
            message: "Lesson created successfully!",
            data: data,
        };
    } catch (error) {
        return errorObject("Something went wrong!", {
            commonError: error.message,
        });
    } finally {
        if (check) {
            revalidatePath("/dashboard/manage/lesson");
            redirect("/dashboard/manage/lesson");
        }
    }
};
