'use client'

import { Button } from "@nextui-org/button"
import { DetailedHTMLProps, HTMLAttributes } from "react"
import Image from "next/image"
import { usePlayerState } from "../model/usePlayerState"
import { usePlayerController } from "@/shared/providers/spotify-player"
import { shuffle } from "../model/shuffle"

interface ActionButtonsProps {
	elementsProps?: {
		wrapper: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	}
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ elementsProps }) => {
	const player = usePlayerState()
	const controller = usePlayerController()

	const isActionsDisabled = !player.data || !controller

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
					src="/icons/shuffle.svg"
					alt="Shuffle playback"
					width={35}
					height={35}
				/>

			</Button>

			<Button
				onPress={() => controller?.previousTrack()}
				isDisabled={isActionsDisabled}
				isIconOnly
				className=""
			>
				<Image
					src="/icons/play-skip-back.svg"
					alt="Playback skip backward"
					width={35}
					height={35}
				/>
			</Button>

			<Button
				onPress={() => {
					controller?.togglePlay()
				}}
				isDisabled={isActionsDisabled}
				isIconOnly
			// variant=""
			>
				{!player.data || player.data?.paused ? (
					<Image
						src="/icons/play.svg"
						alt="Play"
						width={35}
						height={35}
					/>
				) : (
					<Image
						src="/icons/pause.svg"
						alt=""
						width={35}
						height={35}

						className="Pause"
					/>
				)}
			</Button>
			<Button
				onPress={() => controller?.nextTrack()}
				isDisabled={isActionsDisabled}
				isIconOnly
				className=""
			>
				<Image
					src="/icons/play-skip-back.svg"
					alt="Playback skip forward"
					width={35}
					height={35}
					className="rotate-180"
				/>
			</Button>

		</div>
	)
}
