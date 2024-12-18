'use client'

import { $axios } from "@/utils/$axios";
import { useCallback } from "react";
import { usePlaybackState, usePlayerDevice, useSpotifyPlayer, WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { playCarlyRaeJepsen } from "./player-actions";
import { pause, play } from "@/entities/player";
import { Button } from "@nextui-org/button";

interface PlayerProps {
	accessToken: string
}

export const Player: React.FC<PlayerProps> = ({ accessToken }) => {


	const getOAuthToken = useCallback(callback => {
		callback(accessToken);
	}, []);

	return (
		<WebPlaybackSDK

			initialDeviceName="My Spotify App"
			getOAuthToken={getOAuthToken}
			initialVolume={0.5}

			connectOnInitialized={true}
		>
		<Button>button</Button>

			<PlayerContent />
		</WebPlaybackSDK>
	);
}

export const PlayerContent = () => {
	const player = useSpotifyPlayer()
	const playback = usePlaybackState(true, 1000)
	const device = usePlayerDevice()

	return (
		<div>
			{!player && (<div>loading</div>)}
			{player && (<div>
				<form action={playCarlyRaeJepsen}>
					<input type="text" name="device-id" defaultValue={device?.device_id} />
					<button type="submit">
						Play Carly Rae Jepsen
					</button>
					<button formAction={pause}>
						pause
					</button>
					<button formAction={play}>
						play
					</button>
				</form>

				<p>{playback?.track_window.current_track.name}</p>
				<p>{device?.device_id}</p>
				<p>{device?.status}</p>
			</div>)}
		</div>
	)
}
