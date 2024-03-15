import { z } from "zod";

export const newLessonSchema = z.object({
    creditScore: z
        .number()
        .min(1, { message: "Credit score is required" })
        .max(8, { message: "Credit score must be at most 8" }),
    lessonName: z
        .string()
        .min(1, { message: "Lesson name is required" })
        .max(16, { message: "Lesson name must be at most 16 characters" }),
});
