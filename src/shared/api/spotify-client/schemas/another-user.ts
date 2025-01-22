import { z } from "zod";
import { COUNTRY_ISO_ALPHA_2, SPOTIFY_URI } from "../constants";
import { createEntity } from "../createEntity";
import { imageSchema } from "./image";

export const anotherUserSchema = createEntity('user', {
	display_name: z.string().max(32).nonempty().nullable(),
	external_urls: z.object({
		spotify: z.string().url()
	}),
	followers: z.object({
		href: z.string().url().nullable(),
		total: z.number().nonnegative()
	}),
	href: z.string().url(),
	images: imageSchema.array(),
	uri: z.string().regex(SPOTIFY_URI)
})

export type AnotherUser = z.output<typeof anotherUserSchema>
