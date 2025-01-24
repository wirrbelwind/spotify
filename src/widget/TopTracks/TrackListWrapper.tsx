'use client'

import { getUserTopTracksOptions, TrackList } from "@/entities/track"
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
			tracks={{
				data: trackList.data,
				isError: trackList.isError,
				isLoading: trackList.isLoading
			}}
		/>
	)
}