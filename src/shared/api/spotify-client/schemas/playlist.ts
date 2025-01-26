import { z } from "zod";
import { createEntity } from "../createEntity";
import { imageSchema } from "./image";
import { pageWith } from "./page";
import { SPOTIFY_URI } from "../constants";
import { playlistTrackSchema } from "./playlist-track";
import { anotherUserSchema } from "./another-user";
import { externalUrlsSchema } from "./external-urls";
import { followersSchema } from "./followers";

export const playlistSchema = createEntity('playlist', {
	collaborative: z.boolean(),
	description: z.string().nullable(),
	external_urls: externalUrlsSchema,
	followers: followersSchema,
	href: z.string().url(),
	images: imageSchema.array(),
	name: z.string().nonempty(),
	// owner: anotherUserSchema,
	public: z.boolean().nullable(),
	snapshot_id: z.string(),
	// tracks: pageWith(playlistTrackSchema),
	uri: z.string().regex(SPOTIFY_URI)
})


export type Image = z.output<typeof playlistSchema>