import z from 'zod';

export const createCourseSchema = z.object({
    body: z.object({
        title: z.string({ required_error: "Title is required" }).min(1, "Title is required"),
        description: z.string({ required_error: "Description is required" }).min(1, "Description is required"),
        price: z.number({ required_error: "Price is required" }).min(0, "Price cannot be negative"),
        thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
    }),
});

export const updateCourseSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        price: z.number().min(0, "Price cannot be negative"),
        thumbnail: z.string().url("Thumbnail must be a valid URL"),
        isPublished: z.boolean(),
    }).partial(),
});