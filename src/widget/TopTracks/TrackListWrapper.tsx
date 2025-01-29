'use client'

import { getUserTopTracksOptions, TrackList } from "@/entities/track"
import { getBestFitImage } from "@/shared/lib/getBestFitImage"
import { useQuery } from "@tanstack/react-query"

export const TrackListWrapper = () => {
	const trackList = useQuery(getUserTopTracksOptions(5))

	return (
		<TrackList
			hideHeader
			classNames={{
				wrapper: 'mt-2'
			}}
			columns={[
				'order',
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