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
				columns={["play", "avatar", "name", "album", "duration"]}
				items={playlist.data?.tracks.items.map(item => {
					let images: Array<{
						url: string;
						height: number | null;
						width: number | null;
					}> = []
					let packageName
					let artists = []

					if (item.track.type === 'track') {
						images = item.track.album.images
						packageName = item.track.album.name
						artists = item.track.artists.map(artist => ({
							name: artist.name,
							url: artist.href
						}))
					}
					if (item.track.type === 'episode') {
						images = item.track.images
						packageName = item.track.show.name
						artists = [{
							name: item.track.show.publisher,
							url: null
						}]
					}

					return {
						addedAt: item.added_at,
						addedBy: item.added_by,
						album: {
							images,
							name: packageName,
						},
						artists,
						durationMs: item.track.duration_ms,
						id: item.track.id,
						name: item.track.name,
						uri: item.track.uri
					}
				})}
			/>
			<p>{playlistId}</p>
		</>
	)
}