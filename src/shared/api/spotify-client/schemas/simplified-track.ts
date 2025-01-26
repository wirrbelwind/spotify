import { z } from "zod";
import { createEntity } from "../createEntity";
import { simplifiedArtistSchema } from "./simplified-artist";
import { SPOTIFY_URI } from "../constants";
import { externalUrlsSchema } from "./external-urls";

export const simplifiedTrackSchema = createEntity('track', {
	// artists: simplifiedArtistSchema.array(),
	available_markets: z.string().array(),
	disc_number: z.number().int(),
	duration_ms: z.number().nonnegative(),
	explicit: z.boolean(),
	external_urls: externalUrlsSchema,
	href: z.string().url(),
	is_playable: z.boolean(),
	linked_from: z.unknown(),
	// restrictions: z.object({
	// 	reason: z.union([
	// 		z.literal('market'),
	// 		z.literal('product'),
	// 		z.literal('explicit'),
	// 		z.unknown(),
	// 	])
	// }),
	name: z.string().nonempty(),
	preview_url: z.string().url().describe('Deprecated. Always is null').nullable(),
	track_number: z.number().nonnegative(),
	uri: z.string().regex(SPOTIFY_URI),
	is_local: z.boolean()
})

export type SimplifiedTrack = z.output<typeof simplifiedTrackSchema>
