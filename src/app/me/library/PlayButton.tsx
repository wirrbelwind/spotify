'use client'

import PlayerEntity from "@/entities/player"
import { Button } from "@nextui-org/button"
import { usePlaybackState, usePlayerDevice, useSpotifyPlayer } from "react-spotify-web-playback-sdk"

interface PlayButtonProps {
	uri: string
}

export const PlayButton: React.FC<PlayButtonProps> = ({ uri }) => {
	const device = usePlayerDevice()
	const playback = usePlaybackState(true, 1000)
	const player = useSpotifyPlayer()

	const handlePlay = () => {
		if (device?.status === 'ready' && device.device_id) {
			if (playback?.context.uri === uri) {
				// toggle pause play
				player?.togglePlay()
			}
			else {
				PlayerEntity.actions.startAudio(uri, device.device_id)
			}
		}
	}

	return (
		<div>
			<Button
				onPress={handlePlay}
			>
				{device?.device_id} | {uri}
			</Button>
			{/* 
			<input
				type="hidden"
				name="uri"
				defaultValue={uri}
			/>

			<input
				type="hidden"
				name="device-id"
				defaultValue={device?.device_id}
			/> */}
		</div>
	)
}
