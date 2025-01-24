'use client'

import { TrackList } from "@/entities/track"
import { getPlaylistOptions } from "@/entities/track/api/playlist/getPlaylistOptions"
import { useQuery } from "@tanstack/react-query"
import { FC } from "react"

interface TrackListWrapperProps {
	playlistId: string
}

export const TrackListWrapper: FC<TrackListWrapperProps> = ({ playlistId }) => {
	const playlist = useQuery(getPlaylistOptions(playlistId))

	return (
		<>
		<TrackList
			fromPlaylist={true}
			columns={["order", "avatar", "name", "album", "duration"]}
			tracks={{
				isLoading: playlist.isLoading,
				isError: playlist.isError,
				data: playlist.data?.tracks.items[0].
			}}
		/>
		<p>123</p>
		</>
	)
}