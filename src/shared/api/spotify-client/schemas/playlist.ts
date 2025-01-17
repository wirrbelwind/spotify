import { z } from "zod";
import { createEntity } from "../createEntity";
import { imageSchema } from "./image";
import { pageWith } from "./page";
import { SPOTIFY_URI } from "../constants";
import { playlistTrackSchema } from "./playlist-track";

export const playlistSchema = createEntity('playlist', {
	collaborative: z.boolean(),
	description: z.string().nullable(),
	external_urls: z.object({
		spotify: z.string().url()
	}),
	followers: z.object({
		href: z.string().url().nullable(),
		total: z.number().int().nonnegative()
	}),
	href: z.string().url(),
	images: imageSchema.array(),
	name: z.string().nonempty(),
	// create schema of another user
	owner: z.object({}),
	public: z.boolean().nullable(),
	snapshot_id: z.string(),
	tracks: pageWith(playlistTrackSchema),
	uri: z.string().regex(SPOTIFY_URI)
})