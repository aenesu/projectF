"use server";

import { errorObject } from "@/utils/functions/error-object";
import { newStudentInformationSchema } from "@/utils/validations/new-student-information-schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { transformErrors } from "@/utils/functions/transform-errors";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { updateStudentInformation } from "@/actions/student-information/update-student-information";

export const updateStudentInformationAction = async (prevState, formData) => {
    const rawFormData = trimFormDataFields(formData);
    let check = false;

    const { id } = rawFormData;

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
        const response = await updateStudentInformation(validatedData.data, id);

        const data = await response.json();

        if (!response.ok) {
            return errorObject("Something went wrong!", {
                commonError: data?.message
                    ? data?.message
                    : "Some bad things happened while trying to update the student information.",
            });
        }

        check = true;
        return {
            status: "success",
            message: "Student information updated successfully!",
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
