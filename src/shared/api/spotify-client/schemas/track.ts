import { z } from "zod"
import { COUNRTRY_ISO_ALPHA_2, EAN, ISRC, SPOTIFY_URI, UPC } from "../constants"
import { simplifiedArtistSchema } from "./artist"
import { albumSchema } from "./album"
import { createEntity } from "../createEntity"

export const trackSchema = createEntity('track', {
	album: albumSchema,
	artists: simplifiedArtistSchema.array(),
	available_markets: z.string().array().element.regex(COUNRTRY_ISO_ALPHA_2),
	disc_number: z.number().positive(),
	duration_ms: z.number().nonnegative(),
	explicit: z.boolean(),
	external_ids: z.object({
		ISRC: z.string().regex(ISRC),
		ean: z.string().regex(EAN),
		UPC: z.string().regex(UPC),
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
	}),
	name: z.string().nonempty(),
	popularity: z.number().min(0).max(100),
	preview_url: z.string().url().describe('Deprecated. Always is null').nullable(),
	track_number: z.number().nonnegative(),
	uri: z.string().regex(SPOTIFY_URI),
	is_local: z.boolean()
})

export const savedTrack = z.object({
	added_at: z.date(),
	track: trackSchema
})