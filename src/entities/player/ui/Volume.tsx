'use client'

import { usePlayerController } from "@/providers/spotify-player"
import { Slider } from "@nextui-org/slider"
import { useChangeVolume } from "../model/useChangeVolume"
import { INITIAL_VOLUME } from "../constants"
import { Button } from "@nextui-org/button"
import Image from "next/image"
import { MouseEvent, MouseEventHandler, use, useRef, useState } from "react"
import { usePlayerState } from "../model/usePlayerState"

export const Volume = () => {
	const volume = useChangeVolume()
	const sliderRef = useRef<HTMLElement | null>(null)
	const volumeBeforeMute = useRef<null | number>(null)
	const [muted, setMuted] = useState(false)

	const handleToggleVolume = () => {
		const currentVolume = sliderRef.current.value

		if (currentVolume && currentVolume > 0) {
			volumeBeforeMute.current = currentVolume

			sliderRef.current.value = 0
			volume.mutate({ newValue: 0 })
			setMuted(true)
		}
		else {
			sliderRef.current.value = volumeBeforeMute.current
			volume.mutate({ newValue: volumeBeforeMute.current })
			setMuted(false)
		}
	}

	const handleChangeVolume: MouseEventHandler<HTMLInputElement> = (e) => {
		const newValue = e.currentTarget.value
		volume.mutate({newValue})
	}

	return (
		<div className="flex gap-2">
			<Button
				isIconOnly
				onPress={handleToggleVolume}
			>
				{muted ? (
					<Image
						src="/mute.svg"
						width={35}
						height={35}
						alt="Mute"
					/>
				) : (
					<Image
						src="/unmute.svg"
						width={35}
						height={35}
						alt="Unmute"
					/>
				)}


			</Button>

			{/* <Slider
				ref={sliderRef}
				classNames={{
					base: 'w-36'
				}}
				defaultValue={INITIAL_VOLUME}
				step={0.01}
				maxValue={1}
				onChangeEnd={newValue => {
					volume.mutate({
						newValue
					})
				}}
			/> */}
			<input
				type="range"
				defaultValue={INITIAL_VOLUME}
				step={0.01}
				max={1}
				ref={sliderRef}
				onMouseUp={handleChangeVolume}
			/>
		</div>
	)

}