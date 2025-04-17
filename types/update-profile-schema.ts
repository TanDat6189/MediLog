import * as z from "zod";

const bloodType = ["A", "B", "AB", "O", "unknown"] as const;

export const UpdateProfileSchema = z.object({
  fullName: z.string(),
  birthYear: z.number(),
  hometown: z.string(),
  height: z.number().int(),
  weight: z.number(),
  bloodType: z.enum(bloodType),
  medicalHistory: z.string(),
});
