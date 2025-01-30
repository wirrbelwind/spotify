import { z } from "zod";
import { createEntity } from "../createEntity";
import { COUNTRY_ISO_ALPHA_2, EAN, ISRC, SPOTIFY_URI, UPC } from "../constants";
import { imageSchema } from "./image";
import { copyrightSchema } from "./copyright";
import { pageWith } from "./page";
import { simplifiedArtistSchema } from "./simplified-artist";
import { simplifiedTrackSchema } from "./simplified-track";
import { externalUrlsSchema } from "./external-urls";
import { restrictionsSchema } from "./restrictions";
import { externalIdsSchema } from "./externalIds";

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
	release_date: z.string(),
	release_date_precision: z.union([
		z.literal("year"),
		z.literal("month"),
		z.literal("day"),
	]),
	restrictions: restrictionsSchema.optional(),
	uri: z.string().regex(SPOTIFY_URI),
	// artists: simplifiedArtistSchema.array(),
	// tracks: pageWith(simplifiedTrackSchema),
	copyrights: copyrightSchema,
	external_ids: externalIdsSchema,
	genres: z.string().array().max(0),
	label: z.string().nonempty(),
	popularity: z.number().min(0).max(100)
})

export type Album = z.output<typeof albumSchema>
