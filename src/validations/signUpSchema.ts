import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email address is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "confirm password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "password and confirm password is not match",
    path: ["confirmPassword"],
  });

type signUpType = z.infer<typeof signUpSchema>;

export { signUpSchema, type signUpType };
