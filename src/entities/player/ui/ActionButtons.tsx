'use client'

import { Button } from "@nextui-org/button"
import { DetailedHTMLProps, HTMLAttributes } from "react"
import { playerServerActions } from ".."
import NextImage from "next/image"
import { Image } from "@nextui-org/image"
import { useQuery } from "@tanstack/react-query"
import { playerStateOptions } from "../model/playerStateOptions"
import { usePlayerController } from "@/providers/spotify-player"
import { usePlayerState } from "../model/usePlayerState"

interface ActionButtonsProps {
	elementsProps?: {
		wrapper: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	}
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ elementsProps }) => {
	const player = usePlayerState()
	const controllerContext = usePlayerController()

	const isActionsDisabled = !player.data
	
	console.log(controllerContext?.shuffle)

	return (
		<div
			{...elementsProps?.wrapper}
		>
			<h1>prev: {player.data?.track_window.previous_tracks.length}</h1>
			<h1>next: {player.data?.track_window.next_tracks.length}</h1>
			{/* <Button
				// onPress={playerContext?.controller}
				// isDisabled={!player.isSomethingPlaying}
				isIconOnly
				className=" bg-none"
			>
				{player._library.playback?.shuffle ? 'shuffle on' : 'shuffle off'}
			</Button> */}
	
			<Button
				onPress={() => controllerContext?.controller?.previousTrack()}
				isDisabled={isActionsDisabled}
				isIconOnly
				className=" bg-none"
			>
				{'<'}
			</Button>

			<Button
				onPress={() => {
					controllerContext?.controller?.togglePlay()
				}}
				isDisabled={isActionsDisabled}
				isIconOnly
			>
				{player.data && player.data?.paused ? (
					<Image
						src="/play.svg"
						className="w-10 h-10"
						alt=""
						as={NextImage}
						width={40}
						height={40} />
				) : (
					<Image
						src="/pause.svg"
						alt=""
						className="w-10 h-10"
						as={NextImage}
						width={40}
						height={40} />

				)}
			</Button>
			<Button
				onPress={() => controllerContext?.controller?.nextTrack()}
				isDisabled={isActionsDisabled}
				isIconOnly
				className=" bg-none"
			>
				{'>'}
			</Button>

		</div>
	)
}
