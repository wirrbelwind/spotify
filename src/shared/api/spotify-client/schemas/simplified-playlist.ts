import { z } from "zod";
import { createEntity } from "../createEntity";
import { currentUserSchema } from "./current-user";
import { imageSchema } from "./image";
import { SPOTIFY_URI } from "../constants";
import { anotherUserSchema } from "./another-user";

export const simplifiedPlaylistSchema = createEntity('playlist', {
	collaborative: z.boolean(),
	description: z.string().nullable(),
	external_urls: z.object({
		spotify: z.string().url()
	}),
	href: z.string().url(),
	images: imageSchema.array(),
	name: z.string().nonempty(),
	owner: anotherUserSchema,
	public: z.boolean().nullable(),
	snapshot_id: z.string(),
	tracks: z.object({
		href: z.string().url(),
		total: z.number().int().nonnegative()
	}),
	uri: z.string().regex(SPOTIFY_URI)
})