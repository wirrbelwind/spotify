'use client'

import { Button } from "@nextui-org/button"
import { DetailedHTMLProps, HTMLAttributes } from "react"
import { usePlayer } from "../model/_usePlayer"
import { playerServerActions } from ".."
import NextImage from "next/image"
import { Image } from "@nextui-org/image"

interface ActionButtonsProps {
	elementsProps?: {
		wrapper: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	}
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ elementsProps }) => {
	const player = usePlayer()

	return (
		<div
			{...elementsProps?.wrapper}
		>
			<Button
				onPress={player.actions.handleShuffle}
				isDisabled={!player.isSomethingPlaying}
				isIconOnly
				className=" bg-none"
			>
				{player._library.playback?.shuffle ? 'shuffle on' : 'shuffle off'}
			</Button>

			<Button
				onPress={player.actions.handlePrev}
				isDisabled={!player.isSomethingPlaying}
				isIconOnly
				className=" bg-none"
			>
				prev
			</Button>

			<Button
				onPress={player.actions.togglePause}
				isDisabled={!player.isSomethingPlaying}
				isIconOnly
			>
				{player._library.playback?.paused ? (
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
				onPress={player.actions.handleNext}
				isDisabled={!player.isSomethingPlaying}
				isIconOnly
				className=" bg-none"
			>
				next
			</Button>

		</div>
	)
}
