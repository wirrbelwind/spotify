'use client'
import { usePlayerState } from "@/entities/player/model/usePlayerState";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, TableProps } from "@heroui/table";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { allColumnsDefinitions, cellsMap, headersMap } from "./constants";
import { ColumnType, ListItem, ListItemWithPlaylistData, PlaylistColumnType } from "./types";
import { Spinner } from "@heroui/spinner";
import { startAudio } from "@/entities/player";
import { spotifyApi } from "@/shared/api/spotify-client";
import { useOnVisible } from "@/shared/lib/useOnVisible";

interface TrackListPropsBase {
	fromPlaylist?: boolean

	hideHeader?: boolean
	classNames?: TableProps['classNames']
	initialLoading?: boolean
	onScrollDown?: () => void
}
interface TrackListPropsCommon extends TrackListPropsBase {
	fromPlaylist: false
	columns: ColumnType[]
	items?: ListItem[]
}

// with playlist data
interface TrackListPropsWithPlaylistData extends TrackListPropsBase {
	fromPlaylist: true
	columns: Array<ColumnType | PlaylistColumnType>
	items: ListItemWithPlaylistData[]
}

type TrackListProps = TrackListPropsCommon | TrackListPropsWithPlaylistData

export const TrackList: FC<TrackListProps> = ({
	columns,
	hideHeader,
	classNames,
	fromPlaylist,
	items,
	initialLoading,
	onScrollDown

}) => {
	const player = usePlayerState()

	const columnsToShow = useMemo(
		() => allColumnsDefinitions
			.filter(columnDef => columns.includes(columnDef.key)),
		[columns]
	)

	const [selectedTracks, setSelectedTracks] = useState<string[]>([])

	const isLikesColumn = Boolean(columnsToShow.find(item => item.key === 'liked'))

	// const likes = useQuery(getCheckLikedTracksOptions({
	// 	enabled: isLikesColumn && Boolean(items),
	// 	idList: items?.map(item => item.id)
	// }))
	const likes = useQuery(spotifyApi.checkUsersSavedTracks.queryOptions({
		idList: items?.map(item => item.id),
		override: {
			enabled: isLikesColumn && Boolean(items),
		}
	}))

	const uriList = useMemo(() => {
		return items?.map(item => item.uri)
	}, [items])

	// const like = useLike()
	const ref = useOnVisible(
		onScrollDown,
	)

	return (<div className="relative">
		<Table
			hideHeader={hideHeader}
			classNames={classNames}
		>
			<TableHeader columns={columnsToShow}>
				{(column) => {
					const HeaderComponent = headersMap[column.key]

					return (
						<TableColumn key={column.key}>
							<HeaderComponent column={column} />
						</TableColumn>
					)
				}}
			</TableHeader>
			<TableBody
				isLoading={initialLoading}
				loadingContent={<Spinner />}
			>
				{
					items?.map((track, trackIndex) => {
						console.log(track.name)
						return (
							(<TableRow
								key={track.id}
								className={`
								hover:bg-gray-400
								group/track
								${player.data?.track_window.current_track.id === track.id && 'text-green-600'}
								cursor-pointer
								${selectedTracks.includes(track.id) && 'bg-gray-500'}
								max-h-14
								`}
								onClick={(event) => {
									if (event.shiftKey) {
										if (selectedTracks.includes(track.id)) {
											setSelectedTracks(prev => prev.filter(item => item !== track.id))
										}
										else {
											setSelectedTracks(prev => [...prev, track.id])
										}
									}
									else {
										setSelectedTracks([track.id])
									}
								}}
								onDoubleClick={() => {
									startAudio({
										audioUris: uriList,
										offset: track.uri
									})
								}}
								data-context-menu-entity-type="track"
								data-context-menu-entity-uri={track.uri}
							>
								{
									columnsToShow.map(column => {
										const CellComponent = cellsMap[column.key]

										return (
											<TableCell key={`${track.id}:${column.key}`}>
												{/* @ts-expect-error */}
												<CellComponent
													trackIndex={trackIndex}
													track={track}
													allTracks={items}
													likes={likes.data}
													withPlaylistData={fromPlaylist}
												/>
											</TableCell>
										)
									})
								}
							</TableRow>) ?? []
						)
					})
				}
			</TableBody>
		</Table>
		
		{
			onScrollDown && (
				<div
					ref={ref}
					className="absolute bottom-72"
				>
					SCROLLED
				</div>
			)
		}
	</div>);
}
