import moment from "moment";
import { z } from "zod";
import { timeRegex } from "@/utils/regex/time-regex";

export const newLessonProgramSchema = z
    .object({
        day: z.enum([
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
        ]),
        educationTermId: z
            .string()
            .min(1, { message: "Education term must be selected" }),
        lessonIdList: z.string().array().nonempty({
            message: "Select at least one lesson to create a lesson program",
        }),
        startTime: z
            .string()
            .min(1, { message: "Start time is required" })
            .regex(timeRegex, { message: "Invalid time format" }),
        stopTime: z
            .string()
            .min(1, { message: "Stop time is required" })
            .regex(timeRegex, { message: "Invalid time format" }),
    })
    .refine(
        (data) => {
            const start = moment(data.startTime, "HH:mm");
            const stop = moment(data.stopTime, "HH:mm");

            return start.isBefore(stop);
        },
        {
            message: "Start time must be before stop time",
            path: ["commonError"],
        }
    );
