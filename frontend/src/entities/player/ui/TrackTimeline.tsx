import { DetailedHTMLProps, HTMLAttributes } from "react"
import { usePlayer } from "../model/usePlayer"
import { millisecondsToTime } from "@/utils/millisecondsToTime"
import { Slider } from "@nextui-org/slider"

interface TrackTimelineProps {
	elementsProps?: {
		wrapper: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	}
}

export const TrackTimeline: React.FC<TrackTimelineProps> = ({ elementsProps }) => {
	const player = usePlayer()

	return (
		<div {...elementsProps?.wrapper}>
			<p>{millisecondsToTime(player._library.playback?.position)}</p>
			<Slider
				className="max-w-md"
				value={player._library.playback?.position}
				maxValue={player._library.playback?.duration}
				minValue={0}
				step={1}
				onChangeEnd={player.actions.handleRewind}
			/>
			<p>{millisecondsToTime(player._library.playback?.duration)}</p>

		</div>
	)
}