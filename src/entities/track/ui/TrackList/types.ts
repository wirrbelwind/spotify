import { TrackObject } from "@/app/types"

export type ColumnType = 'order' | 'avatar' | 'name' | 'album' | 'liked' | 'duration'

export interface CellProps {
	track: TrackObject
	allTracks: TrackObject[]
	
}
