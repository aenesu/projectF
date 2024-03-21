import { z } from "zod";

export const chooseLessonProgramSchema = z.object({
    lessonProgramId: z
        .string()
        .min(1, { message: "Please select a lesson program" })
        .array()
        .nonempty({ message: "Please select a lesson program" }),
});
