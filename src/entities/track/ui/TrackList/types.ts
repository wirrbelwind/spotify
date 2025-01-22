import { PlaylistTrack } from "@/shared/api/spotify-client/schemas/playlist-track"
import { Track } from "@/shared/api/spotify-client/schemas/track"
import { UseQueryResult } from "@tanstack/react-query"

export type ColumnType = 'order' | 'avatar' | 'name' | 'album' | 'liked' | 'duration'

export type CellProps = {
	withPlaylistData: false
	trackIndex: number
	track: Track
	allTracks: Track[]
	likes: boolean[] | undefined
} | {
	withPlaylistData: true
	trackIndex: number
	track: PlaylistTrack
	allTracks: PlaylistTrack[]
	likes: boolean[] | undefined
}