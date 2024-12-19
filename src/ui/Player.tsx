'use client'

import { usePlaybackState, usePlayerDevice, useSpotifyPlayer, WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { Button } from "@nextui-org/button";
import { useMemo } from "react";

export const Player = () => {
	const player = useSpotifyPlayer()
	const playback = usePlaybackState(true, 1000)
	const device = usePlayerDevice()
	
	const isDeviceAvailable = useMemo(() => {
		if (device?.status === 'ready' && device?.device_id) {
			return true
		}
		return false
	}, [device?.status, device?.device_id])

	const handlePlay = () => {
		if (!isDeviceAvailable) {
			throw new Error(`Player's device is null, but action "play" is still callable`)
		}
		player?.togglePlay()
	}

	return (
		<div>
			{!player && (<div>loading</div>)}
			{player && (<div>
				<form>
					{/* <Button type="submit">
						Play Carly Rae Jepsen
					</Button> */}
					<Button
						onPress={handlePlay}
						disabled={!isDeviceAvailable}
					>
						{playback?.paused ? 'play' : 'pause'}
					</Button>
				</form>

				<p>{playback?.track_window.current_track.name}</p>
				{/* <p>playback id: {playback?.playback_id}</p> */}
				<p>uri: {playback?.context.uri}</p>
			</div>)}
		</div>
	)
}
