import { z } from "zod"
import { COUNTRY_ISO_ALPHA_2, EAN, ISRC, SPOTIFY_URI, UPC } from "../constants"
import { albumSchema } from "./album"
import { createEntity } from "../createEntity"
import { simplifiedArtistSchema } from "./simplified-artist"

export const trackSchema = createEntity('track', {
	album: albumSchema,
	artists: simplifiedArtistSchema.array(),
	available_markets: z.string().regex(COUNTRY_ISO_ALPHA_2).array(),
	disc_number: z.number().positive(),
	duration_ms: z.number().nonnegative(),
	explicit: z.boolean(),
	external_ids: z.object({
		isrc: z.string().regex(ISRC).optional(),
		ean: z.string().regex(EAN).optional(),
		upc: z.string().regex(UPC).optional(),
	}),
	external_urls: z.object({
		spotify: z.string().url()
	}),
	href: z.string().url(),
	is_playable: z.boolean(),
	linked_from: z.unknown(),
	restrictions: z.object({
		reason: z.union([
			z.literal('market'),
			z.literal('product'),
			z.literal('explicit'),
			z.unknown(),
		])
	}).optional(),
	name: z.string().nonempty(),
	popularity: z.number().min(0).max(100),
	preview_url: z.string().url().describe('Deprecated. Always is null').nullable(),
	track_number: z.number().nonnegative(),
	uri: z.string().regex(SPOTIFY_URI),
	is_local: z.boolean()
})

export type Track = z.output<typeof trackSchema>
