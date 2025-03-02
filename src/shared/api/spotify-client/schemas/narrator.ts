import { z } from "zod";

export const narratorSchema = z.object({
    name: z.string()
})
