import { z } from "zod";
import { trackSchema } from "./track";
import { episodeSchema } from "./episode";
import { anotherUserSchema } from "./another-user";

export const playlistTrackSchema = z.object({
	added_at: z.date().nullable(),
	added_by: anotherUserSchema,
	is_local: z.boolean(),
	track: z.union([
		trackSchema,
		episodeSchema
	])
})
