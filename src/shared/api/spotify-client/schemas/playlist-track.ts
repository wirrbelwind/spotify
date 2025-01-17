import { z } from "zod";
import { trackSchema } from "./track";

export const playlistTrackSchema = z.object({
	added_at: z.date().nullable(),
	// todo: another user
	// added_by:
	is_local: z.boolean(),
	track: z.enum([
		trackSchema,
		
	])
})