import { z } from "zod";

export const newStudentInformationSchema = z.object({
    absentee: z
        .number()
        .gt(0, { message: "Absentee can't be less than 0" })
        .lt(100, { message: "Absentee can't be more than 100" }),
    educationTermId: z
        .string()
        .min(1, { message: "Please select an education term" }),
    finalExam: z
        .number()
        .gt(0, { message: "Final exam can't be less than 0" })
        .lt(100, { message: "Final exam can't be more than 100" }),
    infoNote: z
        .string()
        .min(1, { message: "Info note is required" })
        .max(255, { message: "Info note is too long" }),
    lessonId: z.string().min(1, { message: "Please select a lesson" }),
    midtermExam: z
        .number()
        .gt(0, { message: "Midterm exam can't be less than 0" })
        .lt(100, { message: "Midterm exam can't be more than 100" }),
    studentId: z.string().min(1, { message: "Please select a student" }),
});
