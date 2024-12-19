'use client'

import PlayerEntity from "@/entities/player"
import { Button } from "@nextui-org/button"
import Image from "next/image"
import { usePlaybackState, usePlayerDevice, useSpotifyPlayer } from "react-spotify-web-playback-sdk"

interface PlayButtonProps {
	uri: string
}

export const PlayButton: React.FC<PlayButtonProps> = ({ uri }) => {
	const device = usePlayerDevice()
	const playback = usePlaybackState(true, 1000)
	const player = useSpotifyPlayer()

	const isCurrentPlayback = playback?.context.uri === uri

	const handlePlay = () => {
		if (device?.status === 'ready' && device.device_id) {
			if (isCurrentPlayback) {
				// toggle pause play
				player?.togglePlay()
			}
			else {
				PlayerEntity.startAudio(uri, device.device_id)
			}
		}
	}

	return (
		<Button
			onPress={handlePlay}
			isIconOnly
			className="bg-green-600 w-14 h-14 rounded-full absolute bottom-0 right-0 z-10"
		>
			{(!isCurrentPlayback || (isCurrentPlayback && playback.paused)) ? (
				<Image src="/play.svg" width={30} height={30} alt="" />
			) : (
				<Image src="/pause.svg" width={30} height={30} alt="" />
			)}

		</Button>
	)
}
