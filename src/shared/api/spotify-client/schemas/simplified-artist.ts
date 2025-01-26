import { z } from "zod";
import { SPOTIFY_URI } from "../constants";
import { createEntity } from "../createEntity";

export const simplifiedArtistSchema = createEntity('artist', {
	// external_urls: z.object({
	// 	spotify: z.string().url()
	// }),
	href: z.string().url(),
	name: z.string().nonempty(),
	uri: z.string().regex(SPOTIFY_URI)
})

export type SimplifiedArtist = z.output<typeof simplifiedArtistSchema>