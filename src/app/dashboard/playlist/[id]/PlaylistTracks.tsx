'use client'

import { TrackList } from "@/entities/track"
import { spotifyApi } from "@/shared/api/spotify-client"
import { infiniteQueryOptions, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { FC, useMemo } from "react"

interface TrackListWrapperProps {
	playlistId: string
}

export const PlaylistTracks: FC<TrackListWrapperProps> = ({ playlistId }) => {
	const details = useQuery(
		spotifyApi.getPlaylist.queryOptions({id: playlistId})
	)

	const firstPage = details.data?.tracks
	
	const items = useInfiniteQuery({
		enabled: details.isSuccess && !!firstPage,
		...spotifyApi.getPlaylistItems.queryOptions({
			id: playlistId,
			// @ts-expect-error
			initialData: firstPage,
		}),
	})

	const tracks = useMemo(() => {
		if(!items.isSuccess) {
			return []
		}

		return items.data.pages.map(page => page.items.map(
			item => {
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
			}
		)).flat()
	}, [items.data, items.isSuccess])
	
	return (
		<>
		<TrackList
		onScrollDown={() => items.fetchNextPage()}
			initialLoading={items.isLoading}
				fromPlaylist={true}
				columns={["play", "avatar", "name", "album", "duration"]}
				items={tracks}
			/>
			
			</>
	)
}