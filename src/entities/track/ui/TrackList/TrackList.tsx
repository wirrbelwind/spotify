'use client'
import { usePlayerState } from "@/entities/player/model/usePlayerState";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, TableProps } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useMemo, useRef, useState } from "react";
import { allColumnsDefinitions, cellsMap, headersMap } from "./constants";
import { ColumnType, ListItem, ListItemWithPlaylistData, PlaylistColumnType } from "./types";
import { Spinner } from "@nextui-org/spinner";
import { getCheckLikedTracksOptions } from "../../api/check-like/getCheckLikedTracksOptions";
import { startAudio } from "@/entities/player";
import { useLike } from "../../api/like";

interface TrackListPropsBase {
	fromPlaylist?: boolean

	hideHeader?: boolean
	classNames?: TableProps['classNames']
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
	items
}) => {
	const player = usePlayerState()

	const columnsToShow = useMemo(
		() => allColumnsDefinitions
			.filter(columnDef => columns.includes(columnDef.key)),
		[columns]
	)

	const [selectedTracks, setSelectedTracks] = useState<string[]>([])

	const isLikesColumn = Boolean(columnsToShow.find(item => item.key === 'liked'))

	const likes = useQuery(getCheckLikedTracksOptions({
		enabled: isLikesColumn && Boolean(items),
		idList: items?.map(item => item.id)
	}))

	const uriList = useMemo(() => {
		return items?.map(item => item.uri)
	}, [items])

	const like = useLike()

	return (
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
				isLoading={false}
				loadingContent={<Spinner />}
			>
				{
					items?.map((track, trackIndex) => (
						<TableRow
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
						</TableRow>
						// Conditional expression below provides type safety for <Table />
					)) ?? []
				}
			</TableBody>
		</Table>
	);
}
