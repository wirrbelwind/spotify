import { z } from "zod";
import { trackSchema } from "./track";

export const savedTrack = z.object({
	added_at: z.date(),
	track: trackSchema
})
