import { z } from "zod";
import { createEntity } from "../createEntity";
import { imageSchema } from "./image";
import { currentUserSchema } from "./current-user";
import { trackSchema } from "./track";
import { pageWith } from "./page";
import { SPOTIFY_URI } from "../constants";

export const simplifiedPlaylistSchema = createEntity('playlist', {
	collaborative: z.boolean(),
	description: z.string().nullable(),
	external_urls: z.object({
		spotify: z.string().url()
	}),
	href: z.string().url(),
	images: imageSchema.array(),
	name: z.string().nonempty(),
	owner: currentUserSchema,
	public: z.boolean().nullable(),
	snapshot_id: z.string(),
	// todo: page
	tracks: pageWith(trackSchema),
	uri: z.string().regex(SPOTIFY_URI)
})


