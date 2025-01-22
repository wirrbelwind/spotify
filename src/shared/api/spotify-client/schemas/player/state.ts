import { z } from "zod";
import { SPOTIFY_URI } from "../../constants";
import { trackSchema } from "../track";
import { episodeSchema } from "../episode";

export const playerStateSchema = z.object({
	device: z.object({
		id: z.string().nullable(),
		is_active: z.boolean(),
		is_private_session: z.boolean(),
		is_restricted: z.boolean(),
		name: z.string(),
		type: z.enum([
			'computer',
			'smartphone',
			'speaker'
		]),
		volume_percent: z.number().int().min(0).max(100),
		supports_volume: z.boolean()
	}),
	repeat_state: z.enum([
		'off',
		'track',
		'context'
	]),
	shuffle_state: z.boolean(),
	context: z.object({
		type: z.enum([
			'artist',
			'playlist',
			'album',
			'show'
		]),
		href: z.string().url(),
		external_urls: z.object({
			spotify: z.string().url()
		})
	}).nullable(),
	uri: z.string().regex(SPOTIFY_URI),
	timestamp: z.number().int(),
	progress_ms: z.number().int().nullable(),
	is_playing: z.boolean(),
	item: z.union([
		trackSchema,
		episodeSchema
	]).nullable(),
	currently_playing_type: z.union([
		z.literal('track'),
		z.literal('episode'),
		z.literal('ad'),
		z.unknown(),
	]),
	actions: z.object({
		interrupting_playback:z.boolean().optional(),
		pausing:z.boolean().optional(),
		resuming:z.boolean().optional(),
		seeking:z.boolean().optional(),
		skipping_next:z.boolean().optional(),
		skipping_prev:z.boolean().optional(),
		toggling_repeat_context:z.boolean().optional(),
		toggling_shuffle:z.boolean().optional(),
		toggling_repeat_track:z.boolean().optional(),
		transferring_playback:z.boolean().optional()
	})
})

export type PlayerState = z.output<typeof playerStateSchema>
