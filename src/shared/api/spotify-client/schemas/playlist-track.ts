import { z } from "zod";
import { Track, trackSchema } from "./track";
import { episodeSchema } from "./episode";
import { anotherUserSchema } from "./another-user";

export const playlistTrackSchema = z.object({
	added_at: z.string().date().nullable(),
	added_by: anotherUserSchema,
	is_local: z.boolean(),
	track: trackSchema,
}).transform(value => {
	return {
		...value.track,
		meta: {
			playlist: {
				addedAt: value.added_at,
				addedBy: value.added_by,
				isLocal: value.is_local
			}
		}
	}
})

export type PlaylistTrack = z.output<typeof playlistTrackSchema>
// type Test = PlaylistTrack['a']