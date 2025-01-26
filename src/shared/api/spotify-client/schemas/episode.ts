import { z } from "zod";
import { createEntity } from "../createEntity";
import { imageSchema } from "./image";
import { SPOTIFY_URI } from "../constants";
import { showSchema } from "./show";
import { externalUrlsSchema } from "./external-urls";

export const episodeSchema = createEntity('episode', {
	audio_preview_url: z.string().url().nullable().describe("A URL to a 30 second preview (MP3 format) of the episode. null if not available."),
	description: z.string(),
	html_description: z.string(),
	duration_ms: z.number().nonnegative(),
	explicit: z.boolean(),
	external_urls: externalUrlsSchema,
	href: z.string().url(),
	images: imageSchema.array(),
	is_externally_hosted: z.boolean(),
	is_playable: z.boolean(),
	language: z.string().describe("Deprecated"),
	languages: z.string().array(),
	name: z.string().nonempty(),
	release_date: z.string().date(),
	release_date_precision: z.union([
		z.literal('year'),
		z.literal('month'),
		z.literal('day'),
	]),
	// resume_point: z.object({
	// 	fully_played: z.boolean(),
	// 	resume_position_ms: z.number()
	// }).optional(),
	uri: z.string().regex(SPOTIFY_URI),
	// restrictions: z.object({
	// 	reason: z.union([
	// 		z.literal('market'),
	// 		z.literal('product'),
	// 		z.literal('explicit'),
	// 		z.unknown(),
	// 	])
	// }),
	// show: showSchema
})

export type Episode = z.output<typeof episodeSchema>
