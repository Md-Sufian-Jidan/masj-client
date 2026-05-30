import { z } from "zod";

export const registrationSchema = z
    .object({
        name: z
            .string({ error: "Name is required" })
            .min(2, "Name must be between 2 and 50 characters")
            .max(50, "Name must be between 2 and 50 characters"),
        email: z
            .string({ error: "Email is required" })
            .email("Invalid email address"),
        password: z
            .string({ error: "Password is required" })
            .min(8, "Password must be at least 8 characters"),
        passwordConfirm: z
            .string({ error: "Password Confirmation is required" })
            .min(1),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Password does not match",
        path: ["passwordConfirm"],
    });