'use client'

import { DetailedHTMLProps, HTMLAttributes } from "react"
import { millisecondsToTime } from "@/utils/millisecondsToTime"
import { Slider } from "@nextui-org/slider"
import { useQuery } from "@tanstack/react-query"
import { playerStateOptions } from "../model/playerStateOptions"
import { usePlayerController } from "@/providers/spotify-player"
import { usePlayerState } from "../model/usePlayerState"

interface TrackTimelineProps {
	elementsProps?: {
		wrapper: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	}
}

export const TrackTimeline: React.FC<TrackTimelineProps> = ({ elementsProps }) => {
	const playerContext = usePlayerController()
	const player = usePlayerState()

	const isActionsDisabled = !player.data

	return (
		<div {...elementsProps?.wrapper}>
			<p>
				{millisecondsToTime(player.data?.position ?? 0)}
			</p>
			<Slider
				classNames={{
					base: "max-w-md group/timeline",
					thumb: 'opacity-0 group-hover/timeline:opacity-100 ease-in duration-100',

				}}
				// className="opacity-100"
				value={player.data?.position}
				maxValue={player.data?.duration}
				minValue={0}
				step={1}
				onChangeEnd={newPosition => {
					console.log(newPosition)
					playerContext?.controller?.seek(newPosition[0] ?? newPosition)
				}}
				isDisabled={isActionsDisabled}
			/>
			<p>{millisecondsToTime(player.data?.duration ?? 0)}</p>

		</div>
	)
}
