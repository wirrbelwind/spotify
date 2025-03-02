// /**
//  * Copied from library react-spotify-web-playback-sdk,
//  * and edited.
//  */

import { Track } from "../track";

type ErrorTypes = "account_error" | "authentication_error" | "initialization_error" | "playback_error";

interface Error {
	message: string;
}

interface PlayerInit {
	name: string;
	getOAuthToken(cb: (token: string) => void): void;
	volume?: number | undefined;
	enableMediaSession?: boolean | undefined;
}

type ErrorListener = (err: Error) => void;
type PlaybackInstanceListener = (inst: { device_id: string }) => void;
type PlaybackStateListener = (s: PlayerState) => void;
type EmptyListener = () => void;

type AddListenerFn =
	& ((event: "ready" | "not_ready", cb: PlaybackInstanceListener) => void)
	& ((event: "autoplay_failed", cb: EmptyListener) => void)
	& ((event: "player_state_changed", cb: PlaybackStateListener) => void)
	& ((event: ErrorTypes, cb: ErrorListener) => void);

import { PlayerState } from "./state";

declare global {
	namespace Spotify {
		class Player {
			readonly _options: PlayerInit & { id: string };
			constructor(options: PlayerInit);

			connect(): Promise<boolean>;
			disconnect(): void;
			getCurrentState(): Promise<PlayerState | null>;
			getVolume(): Promise<number>;
			nextTrack(): Promise<void>;

			addListener: AddListenerFn;
			on: AddListenerFn;

			removeListener(
				event: "ready" | "not_ready" | "player_state_changed" | ErrorTypes,
				cb?: ErrorListener | PlaybackInstanceListener | PlaybackStateListener,
			): void;

			pause(): Promise<void>;
			previousTrack(): Promise<void>;
			resume(): Promise<void>;
			seek(pos_ms: number): Promise<void>;
			setName(name: string): Promise<void>;
			setVolume(volume: number): Promise<void>;
			togglePlay(): Promise<void>;

			activateElement(): Promise<void>;
		}
	}
}

