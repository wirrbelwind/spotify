import { z } from "zod";
import { createEntity } from "../createEntity";
import { COUNTRY_ISO_ALPHA_2, EAN, ISRC, SPOTIFY_URI, UPC } from "../constants";
import { imageSchema } from "./image";
import { copyrightSchema } from "./copyright";
import { pageWith } from "./page";
import { simplifiedArtistSchema } from "./simplified-artist";
import { simplifiedTrackSchema } from "./simplified-track";

export const albumSchema = createEntity('album', {
	album_type: z.union([
		z.literal("album"),
		z.literal("single"),
		z.literal("compilation"),
	]),
	total_tracks: z.number().nonnegative(),
	available_markets: z.string().array().element.regex(COUNTRY_ISO_ALPHA_2),
	external_urls: z.object({
		spotify: z.string().url()
	}),
	href: z.string().url(),
	images: imageSchema.array(),
	name: z.string().nonempty(),
	release_date: z.date(),
	release_date_precision: z.union([
		z.literal("year"),
		z.literal("month"),
		z.literal("day"),
	]),
	restrictions: z.object({
		reason: z.union([
			z.literal("market"),
			z.literal("product"),
			z.literal("explicit"),
		]),
	}).optional(),
	uri: z.string().regex(SPOTIFY_URI),
	artists: simplifiedArtistSchema.array(),
	// // todo
	tracks: pageWith(simplifiedTrackSchema),
	copyrights: copyrightSchema,
	external_ids: z.object({
		ISRC: z.string().regex(ISRC),
		ean: z.string().regex(EAN),
		UPC: z.string().regex(UPC)
	}),

	genres: z.string().array().max(0),
	label: z.string().nonempty(),
	popularity: z.number().min(0).max(100)
})







