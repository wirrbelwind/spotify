'use client'

import { $axios } from "@/utils/$axios";
import { useCallback } from "react";
import { usePlaybackState, usePlayerDevice, useSpotifyPlayer, WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { playCarlyRaeJepsen } from "./player-actions";

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
					<input type="text" name="deviceId" defaultValue={device?.device_id} />
					<button type="submit">
						Play Carly Rae Jepsen
					</button>
				</form>

				<p>{playback?.track_window.current_track.name}</p>
				<p>{device?.device_id}</p>
			</div>)}
		</div>
	)
}
