'use client'
import { userTopTracksOptions } from "@/api/userTopTracksOptions";
import { usePlayerState } from "@/entities/player/model/usePlayerState";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import React, { FC, PropsWithChildren } from "react";
import { allColumnsDefinitions, cellsMap, headersMap } from "./constants";
import { ColumnType } from "./types";

/**
 * @type client component
 */

interface TrackListProps {
	columns: ColumnType[]
	hideHeader?: boolean
}

export const TrackList: FC<TrackListProps> = ({ columns, hideHeader }) => {
	const trackList = useQuery(userTopTracksOptions(10))

	const player = usePlayerState()

	const columnsDefinition = allColumnsDefinitions
		.filter(columnDef => columns.includes(columnDef.key))

	return (
		<>
			{trackList.isLoading && (
				<div>loading</div>
			)}

			{trackList.isError && (
				<div>error</div>
			)}

			{trackList.isSuccess && (
				<Table hideHeader={hideHeader}>
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

					<TableBody items={trackList.data.items.map((track, index) => ({
						...track,
						order: index + 1
					}))}>
						{(track) => (
							<TableRow
								key={track.id}
								className={`
									hover:bg-gray-400
									group/track
									${player.data?.track_window.current_track.id === track.id && 'text-green-600'}
									`}
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
			)}
		</>
	);
}
