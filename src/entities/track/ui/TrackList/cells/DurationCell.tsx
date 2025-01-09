import { millisecondsToTime } from "@/utils/millisecondsToTime"

export const DurationCell: React.FC = ({ track }) => {
	return (
		<p>{millisecondsToTime(track.duration_ms)}</p>
	)
}