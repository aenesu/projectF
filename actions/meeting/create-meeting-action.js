"use server";

import moment from "moment";
import { transformErrors } from "@/utils/functions/transform-errors";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { newMeetingSchema } from "@/utils/validations/new-meeting-schema";
import { createMeeting } from "@/actions/meeting/create-meeting";
import { errorObject } from "@/utils/functions/error-object";

/**
 * This function is responsible for creating a new meeting.
 * @param {*} prevState
 * @param {*} formData
 * @returns {Promise<{status: string, message: string, data: object}>} - The status, message and data of the action.
 * @returns {Promise<{status: string, message: string, errors: object}>} - The status, message and errors of the action.
 */

export const createMeetingAction = async (prevState, formData) => {
    // transform the form data to a plain javascript object
    const trimmedData = trimFormDataFields(formData);
    let check = false;
    const updatedFormData = {
        ...trimmedData,
        date: new Date(trimmedData.date),
        studentIds: trimmedData.studentIds
            ? [...trimmedData.studentIds.split(",")]
            : [],
    };

    try {
        const validatedData = newMeetingSchema.safeParse(updatedFormData);
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
            date: moment(validatedData.data.date).format("YYYY-MM-DD"),
        };
        const response = await createMeeting(payload);

        const data = await response.json();

        if (!response.ok) {
            return errorObject("Something went wrong!", {
                commonError: data?.message
                    ? data?.message
                    : "Some bad things happened while trying to create the meeting.",
            });
        }

        check = true;

        return {
            status: "success",
            message: "Meeting created successfully!",
            data: data,
        };
    } catch (error) {
        return errorObject("Something went wrong!", {
            commonError: error.message,
        });
    } finally {
        if (check) {
            revalidatePath("/dashboard/manage/meeting");
            redirect("/dashboard/manage/meeting");
        }
    }
};
