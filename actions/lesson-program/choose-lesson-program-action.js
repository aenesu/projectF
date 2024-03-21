"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { chooseLessonProgram } from "@/actions/lesson-program/choose-lesson-program";
import { chooseLessonProgramSchema } from "@/utils/validations/choose-lesson-program-schema";
import { errorObject } from "@/utils/functions/error-object";
import { transformErrors } from "@/utils/functions/transform-errors";

export const chooseLessonProgramAction = async (prevState, formData) => {
    const dataToValidate = {
        lessonProgramId: formData.get("lessonProgramId")
            ? formData.getAll("lessonProgramId")
            : [],
    };

    let check = false;

    try {
        const validatedData =
            chooseLessonProgramSchema.safeParse(dataToValidate);
        if (!validatedData.success) {
            const errors = validatedData.error.issues
                ? transformErrors(validatedData.error.issues)
                : { commonError: validatedData.error.message };

            return errorObject(
                "Validation Failed! Please check the errors and try again.",
                errors
            );
        }

        const response = await chooseLessonProgram(validatedData.data);

        const data = await response.json();

        if (!response.ok) {
            return errorObject("Something went wrong!", {
                commonError: data.message
                    ? data.message
                    : "Some bad things happened while trying to choose the lesson program.",
            });
        }

        check = true;
        return {
            status: "success",
            message: "Lesson program chosen successfully!",
            data: data,
        };
    } catch (error) {
        return errorObject("Something went wrong!", {
            commonError: error.message,
        });
    } finally {
        if (check) {
            revalidatePath("/dashboard/lessons");
            redirect("/dashboard/lessons");
        }
    }
};
