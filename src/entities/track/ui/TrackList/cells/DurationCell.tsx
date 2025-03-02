import { millisecondsToTime } from "@/shared/lib/millisecondsToTime"
import { CellProps } from "../types"

export const DurationCell: React.FC<CellProps> = ({ track }) => {
	return (
		<p>{millisecondsToTime(track.durationMs)}</p>
	)
}