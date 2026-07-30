import { z } from "zod";

export const enrollSchema = z.object({
    params: z.object({
        courseId: z.string({ required_error: "Course id is required" }).min(1, "Course id is required"),
    }),
});