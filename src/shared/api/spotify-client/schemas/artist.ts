import { z } from "zod"
import { createEntity } from "../createEntity"
import { SPOTIFY_URI } from "../constants"
import { imageSchema } from "./image"
import { simplifiedArtistSchema } from "./simplified-artist"

export const artist = simplifiedArtistSchema.extend({
	// followers: z.object({
	// 	href: z.string().url().optional(),
	// 	total: z.number().nonnegative(),
	// }),
	genres: z.string().array(),
	images: imageSchema.array(),
	popularity: z.number().min(0).max(100)
})

export type SimplifiedArtist = z.output<typeof simplifiedArtistSchema>
