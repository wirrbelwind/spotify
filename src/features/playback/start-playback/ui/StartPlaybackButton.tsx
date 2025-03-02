'use client'

import { startAudio, usePlayerState } from "@/entities/player"
import { usePlayerController } from "@/shared/providers/spotify-player"
import { Button } from "@heroui/button"
import Image from "next/image"

interface StartPlaybackButtonProps {
	uri: string
	showOnHover?: boolean
}

export const StartPlaybackButton: React.FC<StartPlaybackButtonProps> = ({ uri,showOnHover }) => {
	const player = usePlayerState()
	const controller = usePlayerController()

	const isCurrentPlayback = player.data?.context.uri === uri
	const isDisabled = !controller

	const handlePlay = () => {
		if (!controller) {
			throw new Error('player controller is null')
		}

		if (isCurrentPlayback) {
			// toggle pause play
			controller.togglePlay()
		}
		else {
			startAudio({
				contextUri: uri
			})
		}
	}

	return (
		<Button
			onPress={handlePlay}
			isIconOnly
			className={`bg-green-600 w-14 h-14 rounded-full ${showOnHover && 'absolute bottom-0 right-0 z-30 translate-x-full group-hover:-translate-x-4 group-hover:-translate-y-2 transition-transform ease-in-out delay-150 duration-300'}`}
			isDisabled={isDisabled}
		>
			{(!isCurrentPlayback || (isCurrentPlayback && player.data?.paused)) ? (
				<Image src="/icons/play.svg" width={30} height={30} alt="" />
			) : (
				<Image src="/icons/pause.svg" width={30} height={30} alt="" />
			)}

		</Button>
	)
}
