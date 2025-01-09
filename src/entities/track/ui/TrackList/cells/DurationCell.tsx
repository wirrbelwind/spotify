import { millisecondsToTime } from "@/utils/millisecondsToTime"
import { CellProps } from "../types"

export const DurationCell: React.FC<CellProps> = ({ track }) => {
	return (
		<p>{millisecondsToTime(track.duration_ms)}</p>
	)
}