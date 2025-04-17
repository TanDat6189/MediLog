import * as z from "zod";

export const HospitalSchema = z.object({
  name: z.string(),
  address: z.string(),
  hotline: z.string().length(10, {
    message: "Hotline must be exactly 10 characters long",
  }),
});
