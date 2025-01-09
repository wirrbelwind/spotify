'use client'

import { usePlayerController } from "@/providers/spotify-player"
import { Slider } from "@nextui-org/slider"
import { useChangeVolume } from "../model/useChangeVolume"
import { INITIAL_VOLUME } from "../constants"

export const Volume = () => {
	const volume = useChangeVolume()

	return (
		<Slider 
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
		/>
	)

}