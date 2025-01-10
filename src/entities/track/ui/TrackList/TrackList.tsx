'use client'
import { getUserTopTracksOptions } from "@/api/getUserTopTracksOptions";
import { usePlayerState } from "@/entities/player/model/usePlayerState";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, TableProps } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import React, { FC, PropsWithChildren, useMemo, useRef, useState } from "react";
import { allColumnsDefinitions, cellsMap, headersMap } from "./constants";
import { ColumnType } from "./types";
import { Spinner } from "@nextui-org/spinner";
import { SlotsToClasses } from "@nextui-org/theme";
import { spotifyApi } from "@/shared/api";
import { getCheckLikedTracksOptions } from "../../api/check-like/getCheckLikedTracksOptions";

/**
 * @type client component
 */

interface TrackListProps {
	columns: ColumnType[]
	hideHeader?: boolean
	classNames?: TableProps['classNames']
}

export const TrackList: FC<TrackListProps> = ({ columns, hideHeader, classNames }) => {
	const trackList = useQuery(getUserTopTracksOptions(5))

	const player = usePlayerState()

	const columnsDefinition = useMemo(
		() => allColumnsDefinitions
			.filter(columnDef => columns.includes(columnDef.key)),
		[columns]
	)

	const [selectedTracks, setSelectedTracks] = useState<string[]>([])

	const isLikesColumn = Boolean(columnsDefinition.find(item => item.key === 'liked'))

	const likes = useQuery(getCheckLikedTracksOptions({
		enabled: isLikesColumn,
		idList: trackList.data?.items.map(item => item.id)
	}))

	return (
		<Table
			hideHeader={hideHeader}
			classNames={classNames}
		>
			<TableHeader columns={columnsDefinition}>
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
				isLoading={trackList.isLoading}
				loadingContent={<Spinner />}
			>
				{

					trackList.data?.items.map((track, trackIndex) => (
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
						>
							{
								columnsDefinition.map(column => {
									const CellComponent = cellsMap[column.key]

									return (
										<TableCell key={`${track.id}:${column.key}`}>
											<CellComponent
												trackIndex={trackIndex}
												track={track}
												allTracks={trackList.data.items}
												likes={likes.data}
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
