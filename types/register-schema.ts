import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  fullName: z.string().min(4, {
    message: "Please  add a name with at least 4 characters",
  }),
});
