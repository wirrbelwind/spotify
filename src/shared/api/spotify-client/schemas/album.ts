import { z } from "zod";
import { createEntity } from "../createEntity";
import { COUNTRY_ISO_ALPHA_2, EAN, ISRC, SPOTIFY_URI, UPC } from "../constants";
import { imageSchema } from "./image";
import { copyrightSchema } from "./copyright";
import { pageWith } from "./page";
import { simplifiedArtistSchema } from "./simplified-artist";
import { simplifiedTrackSchema } from "./simplified-track";
import { externalUrlsSchema } from "./external-urls";

export const albumSchema = createEntity('album', {
	album_type: z.union([
		z.literal("album"),
		z.literal("single"),
		z.literal("compilation"),
	]),
	total_tracks: z.number().nonnegative(),
	available_markets: z.string().regex(COUNTRY_ISO_ALPHA_2).array(),
	external_urls: externalUrlsSchema,
	href: z.string().url(),
	images: imageSchema.array(),
	name: z.string().nonempty(),
	release_date: z.string().date(),
	release_date_precision: z.union([
		z.literal("year"),
		z.literal("month"),
		z.literal("day"),
	]),
	// restrictions: z.object({
	// 	reason: z.union([
	// 		z.literal("market"),
	// 		z.literal("product"),
	// 		z.literal("explicit"),
	// 	]),
	// }).optional(),
	uri: z.string().regex(SPOTIFY_URI),
	// artists: simplifiedArtistSchema.array(),
	// tracks: pageWith(simplifiedTrackSchema),
	// copyrights: copyrightSchema,
	// external_ids: z.object({
	// 	ISRC: z.string().regex(ISRC).optional(),
	// 	ean: z.string().regex(EAN).optional(),
	// 	UPC: z.string().regex(UPC).optional()
	// }),

	genres: z.string().array().max(0),
	label: z.string().nonempty(),
	popularity: z.number().min(0).max(100)
})

export type Album = z.output<typeof albumSchema>
