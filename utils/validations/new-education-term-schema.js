import { z } from "zod";
import moment from "moment";

export const newEducationTermSchema = z
    .object({
        endDate: z.coerce
            .date()
            .min(new Date(), { message: "Choose a date in the future" }),
        lastRegistrationDate: z.coerce
            .date()
            .min(new Date(), { message: "Choose a date in the future" }),
        startDate: z.coerce
            .date()
            .min(new Date(), { message: "Choose a date in the future" }),
        term: z.string().min(1, { message: "You must select a term" }),
    })
    .refine(
        (data) => {
            const start = moment(data.startDate);
            const end = moment(data.endDate);

            return start.isBefore(end);
        },
        {
            path: ["commonError"],
            message: "Start date must be before the end date",
        }
    )
    .refine(
        (data) => {
            const start = moment(data.startDate);
            const lastRegistration = moment(data.lastRegistrationDate);

            // check if the last registration date is 15 days before the start date
            return start.diff(lastRegistration, "days") >= 15;
        },
        {
            path: ["commonError"],
            message:
                "Last registration date must be at least 15 days before the start date",
        }
    );
