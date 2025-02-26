'use client'

import { TrackList } from "@/entities/track"
import { spotifyApi } from "@/shared/api/spotify-client"
import { Button } from "@heroui/button"
import { Divider } from "@heroui/divider"
import { useDisclosure } from "@heroui/modal"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { TRACKS_LENGTH_COLLAPSED,TRACKS_LENGTH_EXPANDED } from "../config"

export const TrackListWrapper = () => {
	const trackList = useQuery(
		spotifyApi.getCurrentUsersTopTracks.queryOptions({quantity: TRACKS_LENGTH_EXPANDED})
	)

	const showMore = useDisclosure()

	const visibleTracks = useMemo(() => {
		if(!trackList.isSuccess) {
			return []
		}

		const tracksToFormat = (trackList.data.items.length <= TRACKS_LENGTH_COLLAPSED || showMore.isOpen) ?
		trackList.data.items
		:
		trackList.data.items.slice(0, TRACKS_LENGTH_COLLAPSED)

		return tracksToFormat.map(item => ({
			uri: item.uri,
			album: {
				name: item.album.name,
				images: item.album.images
			},
			artists: item.artists.map(artist => ({ name: artist.name, url: artist.href })),
			durationMs: item.duration_ms,
			id: item.id,
			name: item.name,

		}))
	}, [showMore.isOpen, trackList])
	
	return (<>
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
			items={visibleTracks}
		/>

			<Divider className="opacity-0 my-1"/>

		<Button
			onPress={showMore.isOpen ? showMore.onClose : showMore.onOpen}
			variant="ghost"
		>
			{showMore.isOpen ? 'Less' : 'More'}
		</Button>
	</>)
}