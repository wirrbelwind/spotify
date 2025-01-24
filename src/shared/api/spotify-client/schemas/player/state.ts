import { z } from "zod";
import { SPOTIFY_URI } from "../../constants";
import { Track, trackSchema } from "../track";
import { episodeSchema } from "../episode";

// export const playerStateSchema = z.object({
// 	device: z.object({
// 		id: z.string().nullable(),
// 		is_active: z.boolean(),
// 		is_private_session: z.boolean(),
// 		is_restricted: z.boolean(),
// 		name: z.string(),
// 		type: z.enum([
// 			'computer',
// 			'smartphone',
// 			'speaker'
// 		]),
// 		volume_percent: z.number().int().min(0).max(100),
// 		supports_volume: z.boolean()
// 	}),
// 	repeat_state: z.enum([
// 		'off',
// 		'track',
// 		'context'
// 	]),
// 	shuffle_state: z.boolean(),
// 	context: z.object({
// 		type: z.enum([
// 			'artist',
// 			'playlist',
// 			'album',
// 			'show'
// 		]),
// 		href: z.string().url(),
// 		external_urls: z.object({
// 			spotify: z.string().url()
// 		})
// 	}).nullable(),
// 	uri: z.string().regex(SPOTIFY_URI),
// 	timestamp: z.number().int(),
// 	progress_ms: z.number().int().nullable(),
// 	is_playing: z.boolean(),
// 	item: z.union([
// 		trackSchema,
// 		episodeSchema
// 	]).nullable(),
// 	currently_playing_type: z.union([
// 		z.literal('track'),
// 		z.literal('episode'),
// 		z.literal('ad'),
// 		z.unknown(),
// 	]),
// 	actions: z.object({
// 		interrupting_playback:z.boolean().optional(),
// 		pausing:z.boolean().optional(),
// 		resuming:z.boolean().optional(),
// 		seeking:z.boolean().optional(),
// 		skipping_next:z.boolean().optional(),
// 		skipping_prev:z.boolean().optional(),
// 		toggling_repeat_context:z.boolean().optional(),
// 		toggling_shuffle:z.boolean().optional(),
// 		toggling_repeat_track:z.boolean().optional(),
// 		transferring_playback:z.boolean().optional()
// 	})
// })

// export type PlayerState = z.output<typeof playerStateSchema>
interface Entity {
	name: string;
	uri: string;
	url: string;
}
interface Image {
	height?: number | null | undefined;
	url: string;
	size?: string | null | undefined;
	width?: number | null | undefined;
}
interface PlaybackContextTrack extends Entity {
	artists: Entity[];
	content_type: string;
	estimated_duration: number;
	group: Entity;
	images: Image[];
	uid: string;
}
interface PlaybackContextRestrictions {
	pause: string[];
	resume: string[];
	seek: string[];
	skip_next: string[];
	skip_prev: string[];
	toggle_repeat_context: string[];
	toggle_repeat_track: string[];
	toggle_shuffle: string[];
	peek_next: string[];
	peek_prev: string[];
}
interface PlaybackContextMetadata extends Entity {
	current_item: PlaybackContextTrack;
	next_items: PlaybackContextTrack[];
	previous_items: PlaybackContextTrack[];
	restrictions: PlaybackContextRestrictions;
	options: {
			repeat_mode: string;
			shuffled: boolean;
	};
}
interface PlaybackContext {
	metadata: PlaybackContextMetadata | null;
	uri: string | null;
}
interface PlaybackDisallows {
	pausing?: boolean;
	peeking_next?: boolean;
	peeking_prev?: boolean;
	resuming?: boolean;
	seeking?: boolean;
	skipping_next?: boolean;
	skipping_prev?: boolean;
	toggling_repeat_context?: boolean;
	toggling_repeat_track?: boolean;
	toggling_shuffle?: boolean;
}
interface PlaybackRestrictions {
	disallow_pausing_reasons?: string[];
	disallow_peeking_next_reasons?: string[];
	disallow_peeking_prev_reasons?: string[];
	disallow_resuming_reasons?: string[];
	disallow_seeking_reasons?: string[];
	disallow_skipping_next_reasons?: string[];
	disallow_skipping_prev_reasons?: string[];
	disallow_toggling_repeat_context_reasons?: string[];
	disallow_toggling_repeat_track_reasons?: string[];
	disallow_toggling_shuffle_reasons?: string[];
}
interface PlaybackTrackWindow {
	current_track: Track;
	previous_tracks: Track[];
	next_tracks: Track[];
}
export interface PlayerState {
	context: PlaybackContext;
	disallows: PlaybackDisallows;
	duration: number;
	paused: boolean;
	position: number;
	loading: boolean;
	timestamp: number;
	/**
	 * 0: NO_REPEAT
	 * 1: ONCE_REPEAT
	 * 2: FULL_REPEAT
	 */
	repeat_mode: 0 | 1 | 2;
	shuffle: boolean;
	restrictions: PlaybackRestrictions;
	track_window: PlaybackTrackWindow;
	playback_id: string;
	playback_quality: string;
	playback_features: {
			hifi_status: string;
	};
}