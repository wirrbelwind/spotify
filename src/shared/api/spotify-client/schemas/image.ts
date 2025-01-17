import { z } from "zod";

export const imageSchema = z.object({
  url: z.string().url(),
  height: z.number().nullable(),
  width: z.number().nullable()
})
