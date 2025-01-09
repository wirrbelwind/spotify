'use client'
import { userTopTracksOptions } from "@/api/userTopTracksOptions";
import { usePlayerState } from "@/entities/player/model/usePlayerState";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, TableProps } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import React, { FC, PropsWithChildren, useMemo, useState } from "react";
import { allColumnsDefinitions, cellsMap, headersMap } from "./constants";
import { ColumnType } from "./types";
import { Spinner } from "@nextui-org/spinner";
import { SlotsToClasses } from "@nextui-org/theme";

/**
 * @type client component
 */

interface TrackListProps {
	columns: ColumnType[]
	hideHeader?: boolean
	classNames?: TableProps['classNames']
}

export const TrackList: FC<TrackListProps> = ({ columns, hideHeader, classNames }) => {
	const trackList = useQuery(userTopTracksOptions(5))

	const player = usePlayerState()

	const columnsDefinition = useMemo(
		() => allColumnsDefinitions
			.filter(columnDef => columns.includes(columnDef.key)),
		[columns]
	)

	const [selectedTracks, setSelectedTracks] = useState<string[]>([])

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
				items={trackList.isSuccess ? trackList.data.items.map((track, index) => ({
					...track,
					order: index + 1
				})) : []}
				isLoading={trackList.isLoading}
				loadingContent={<Spinner />}
			>
				{(track) => (
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
						{(columnKey) => {
							const CellComponent = cellsMap[columnKey as ColumnType]

							return (
								<TableCell>
									<CellComponent track={track} allTracks={trackList.data.items} />
								</TableCell>
							)
						}}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
