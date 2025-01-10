'use client'

import { Button } from "@nextui-org/button"
import { DetailedHTMLProps, HTMLAttributes } from "react"
import { playerServerActions } from ".."
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { playerStateOptions } from "../model/playerStateOptions"
import { usePlayerController } from "@/shared/providers/spotify-player"
import { usePlayerState } from "../model/usePlayerState"
import { shuffle } from "../model/shuffle"

interface ActionButtonsProps {
	elementsProps?: {
		wrapper: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	}
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ elementsProps }) => {
	const player = usePlayerState()
	const controllerContext = usePlayerController()

	const isActionsDisabled = !player.data

	return (
		<div
			{...elementsProps?.wrapper}
		>
			<Button
				onPress={() => {
					shuffle(!player.data?.shuffle)
				}}
				isDisabled={isActionsDisabled}
				isIconOnly
				className=""
			>
				<Image
					src="/shuffle.svg"
					alt="Shuffle playback"
					width={35}
					height={35}
				/>

			</Button>

			<Button
				onPress={() => controllerContext?.controller?.previousTrack()}
				isDisabled={isActionsDisabled}
				isIconOnly
				className=""
			>
				<Image
					src="/play-skip-back.svg"
					alt="Playback skip backward"
					width={35}
					height={35}
				/>
			</Button>

			<Button
				onPress={() => {
					controllerContext?.controller?.togglePlay()
				}}
				isDisabled={isActionsDisabled}
				isIconOnly
			// variant=""
			>
				{!player.data || player.data?.paused ? (
					<Image
						src="/play.svg"
						alt="Play"
						width={35}
						height={35}
					/>
				) : (
					<Image
						src="/pause.svg"
						alt=""
						width={35}
						height={35}

						className="Pause"
					/>
				)}
			</Button>
			<Button
				onPress={() => controllerContext?.controller?.nextTrack()}
				isDisabled={isActionsDisabled}
				isIconOnly
				className=""
			>
				<Image
					src="/play-skip-back.svg"
					alt="Playback skip forward"
					width={35}
					height={35}
					className="rotate-180"
				/>
			</Button>

		</div>
	)
}
