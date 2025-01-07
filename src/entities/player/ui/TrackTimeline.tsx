'use client'

import { DetailedHTMLProps, HTMLAttributes } from "react"
import { millisecondsToTime } from "@/utils/millisecondsToTime"
import { Slider } from "@nextui-org/slider"
import { useQuery } from "@tanstack/react-query"
import { playerStateOptions } from "../model/playerStateOptions"
import { usePlayerController } from "@/providers/spotify-player"

interface TrackTimelineProps {
	elementsProps?: {
		wrapper: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	}
}

export const TrackTimeline: React.FC<TrackTimelineProps> = ({ elementsProps }) => {
	const playerContext = usePlayerController()
	const playerQuery = useQuery(playerStateOptions(playerContext?.controller))

	return (
		<div {...elementsProps?.wrapper}>
			<p>
				{millisecondsToTime(playerQuery.data?.position ?? 0)}
			</p>
			<Slider
				className="max-w-md"
				value={playerQuery.data?.position}
				maxValue={playerQuery.data?.duration}
				minValue={0}
				step={1}
				onChangeEnd={newPosition => {
					console.log(newPosition)
					playerContext?.controller?.seek(newPosition[0] ?? newPosition)
				}}
			/>
			<p>{millisecondsToTime(playerQuery.data?.duration ?? 0)}</p>

		</div>
	)
}