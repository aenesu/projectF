"use server";

import moment from "moment";
import { errorObject } from "@/utils/functions/error-object";
import { newMeetingSchema } from "@/utils/validations/new-meeting-schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { transformErrors } from "@/utils/functions/transform-errors";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { updateMeeting } from "@/actions/meeting/update-meeting";
import { formatTime } from "@/utils/functions/format-time";

/**
 * This function is responsible for creating a new meeting.
 * @param {*} prevState
 * @param {*} formData
 * @returns {Promise<{status: string, message: string, data: object}>} - The status, message and data of the action.
 * @returns {Promise<{status: string, message: string, errors: object}>} - The status, message and errors of the action.
 */

export const updateMeetingAction = async (prevState, formData) => {
    // transform the form data to a plain javascript object
    const trimmedData = trimFormDataFields(formData);
    let check = false;
    console.log(trimmedData);

    const { id } = trimmedData;

    const updatedFormData = {
        ...trimmedData,
        date: new Date(trimmedData.date),
        startTime: formatTime(trimmedData.startTime),
        stopTime: formatTime(trimmedData.stopTime),
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

        const response = await updateMeeting(payload, id);

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            return errorObject("Something went wrong!", {
                commonError: data?.message
                    ? data?.message
                    : "Some bad things happened while trying to update the meeting.",
            });
        }

        check = true;

        return {
            status: "success",
            message: "Meeting updated successfully!",
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
