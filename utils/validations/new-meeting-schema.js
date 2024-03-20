import moment from "moment";
import { z } from "zod";
import { timeRegex } from "@/utils/regex/time-regex";

export const newMeetingSchema = z
    .object({
        date: z.coerce.date().min(new Date(), {
            message: "You must select a future date for the meeting",
        }),
        description: z
            .string()
            .min(2, { message: "You must provide a description" })
            .max(16, { message: "Description is too long" }),
        startTime: z
            .string()
            .min(1, { message: "You must select a start time" })
            .regex(timeRegex, { message: "Invalid time format" }),
        stopTime: z
            .string()
            .min(1, { message: "You must select a stop time" })
            .regex(timeRegex, { message: "Invalid time format" }),
        studentIds: z
            .string()
            .array()
            .nonempty({ message: "Select at least one student" }),
    })
    .refine(
        (data) => {
            const start = moment(data.startTime, "HH:mm");
            const end = moment(data.stopTime, "HH:mm");

            // Check if startTime is strictly before endTime
            return start.isBefore(end);
        },
        { message: "Start time must be before end time", path: ["startTime"] }
    );
