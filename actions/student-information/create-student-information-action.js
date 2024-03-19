"use server";

import { transformErrors } from "@/utils/functions/transform-errors";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { newStudentInformationSchema } from "@/utils/validations/new-student-information-schema";
import { createStudentInformation } from "@/actions/student-information/create-student-information";
import { errorObject } from "@/utils/functions/error-object";

export const createStudentInformationAction = async (prevState, formData) => {
    const rawFormData = trimFormDataFields(formData);
    let check = false;

    const dataForValidation = {
        ...rawFormData,
        absentee: +rawFormData.absentee,
        finalExam: +rawFormData.finalExam,
        midtermExam: +rawFormData.midtermExam,
    };

    try {
        const validatedData =
            newStudentInformationSchema.safeParse(dataForValidation);
        if (!validatedData.success) {
            const errors = validatedData.error.issues
                ? transformErrors(validatedData.error.issues)
                : { commonError: validatedData.error.message };

            return errorObject(
                "Validation Failed! Please check the errors and try again.",
                errors
            );
        }
        const response = await createStudentInformation(validatedData.data);

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
            revalidatePath("/dashboard/manage/student-information");
            redirect("/dashboard/manage/student-information");
        }
    }
};
