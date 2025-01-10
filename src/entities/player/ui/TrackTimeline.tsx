'use client'

import { DetailedHTMLProps, HTMLAttributes, useCallback, useEffect, useRef, useState } from "react"
import { millisecondsToTime } from "@/shared/lib/millisecondsToTime"
import { Slider } from "@nextui-org/slider"
import { useQuery } from "@tanstack/react-query"
import { playerStateOptions } from "../model/playerStateOptions"
import { usePlayerController } from "@/providers/spotify-player"
import { usePlayerState } from "../model/usePlayerState"
import { debounce } from "@/shared/lib/debounce"

interface TrackTimelineProps {
	elementsProps?: {
		wrapper: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	}
}

export const TrackTimeline: React.FC<TrackTimelineProps> = ({ elementsProps }) => {
	const playerContext = usePlayerController()
	const player = usePlayerState()

	const isActionsDisabled = !player.data

	const [position, setPosition] = useState<number | null>(null)
	const intervalRef = useRef<null | number>(null)

	const handleChange = useCallback(
		debounce(
			(newState?: Spotify.PlaybackState | null) => {
				if (intervalRef.current) {
					clearInterval(intervalRef.current)
				}

				if (!newState) {
					setPosition(null)
				}
				else if (!newState.paused) {
					console.log('new counter')
					setPosition(newState.position + 1000)

					intervalRef.current = setInterval(() => {
						setPosition(prev => prev + 1000)
					}, 1000) as number
				}
			}
			, 1000)
		, [])

	useEffect(() => {
		handleChange(player.data)
	}, [player.data])

	return (
		<div {...elementsProps?.wrapper}>
			<p>
				{millisecondsToTime(position ?? 0)}
			</p>
			<Slider
				classNames={{
					base: "max-w-md group/timeline",
					thumb: 'opacity-0 group-hover/timeline:opacity-100 ease-in duration-100',

				}}
				// className="opacity-100"
				value={position}
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
