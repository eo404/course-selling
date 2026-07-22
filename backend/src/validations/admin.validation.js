import z from 'zod';

export const adminLoginSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }),
        email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
        password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters long"),
    }),
});