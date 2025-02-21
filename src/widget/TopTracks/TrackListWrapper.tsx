'use client'

import { TrackList } from "@/entities/track"
import { spotifyApi } from "@/shared/api/spotify-client"
import { useQuery } from "@tanstack/react-query"

export const TrackListWrapper = () => {
	const trackList = useQuery(
		spotifyApi.getCurrentUsersTopTracks.queryOptions()
	)

	return (
		<TrackList
			hideHeader
			classNames={{
				wrapper: 'mt-2'
			}}
			columns={[
				'play',
				'avatar',
				'name',
				'album',
				'liked',
				'duration'
			]}
			fromPlaylist={false}
			items={trackList.data?.items.map(item => ({
				uri: item.uri,
				album: {
					name: item.album.name,
					images: item.album.images
				},
				artists: item.artists.map(artist => ({ name: artist.name, url: artist.href })),
				durationMs: item.duration_ms,
				id: item.id,
				name: item.name,

			}))}
		/>
	)
}