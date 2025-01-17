import { z } from "zod"
import { createEntity } from "../createEntity"
import { SPOTIFY_URI } from "../constants"
import { imageSchema } from "./image"

export const simplifiedArtistSchema = createEntity('artist', {
	external_urls: z.object({
		spotify: z.string().url()
	}),
	href: z.string().url(),
	name: z.string().nonempty(),
	uri: z.string().regex(SPOTIFY_URI)
})

export const artist = simplifiedArtistSchema.extend({
	followers: z.object({
		href: z.string().url().optional(),
		total: z.number().nonnegative(),
	}),
	genres: z.string().array(),
	images: imageSchema.array(),
	popularity: z.number().min(0).max(100)
})