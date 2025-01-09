import { TrackObject } from "@/app/types"
import { UseQueryResult } from "@tanstack/react-query"

export type ColumnType = 'order' | 'avatar' | 'name' | 'album' | 'liked' | 'duration'

export interface CellProps {
	trackIndex: number
	track: TrackObject
	allTracks: TrackObject[]
	likes: boolean[] | undefined
}
