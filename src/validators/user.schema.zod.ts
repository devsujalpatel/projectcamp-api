import { z } from "zod";

export const userRegistrationSchema = z.object({
  fullName: z
    .string()
    .min(5, { message: "fullName must be at least 5 characters" })
    .max(50, { message: "fullName should be less than 50 characters" }),

  username: z
    .string()
    .min(5, { message: "username must be at least 5 characters" })
    .max(50, { message: "username should be less than 50 characters" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const userLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
