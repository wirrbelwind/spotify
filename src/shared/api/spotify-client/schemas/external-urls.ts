import { z } from "zod";

export const externalUrlsSchema = z.object({
	spotify: z.string().url()
})
