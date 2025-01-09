'use client'
import { userTopTracksOptions } from "@/api/userTopTracksOptions";
import { usePlayerState } from "@/entities/player/model/usePlayerState";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { cellsMap, columnsDefinitions } from "./constants";

/**
 * @type client component
 */
export const TrackList = () => {
	const trackList = useQuery(userTopTracksOptions(10))

	const player = usePlayerState()

	return (
		<>
			{trackList.isLoading && (
				<div>loading</div>
			)}

			{trackList.isError && (
				<div>error</div>
			)}

			{trackList.isSuccess && (
				<Table>
					<TableHeader columns={columnsDefinitions}>
						{(column) => {
							const HeaderComponent = headersMap[column.key]

							return (
								<TableColumn key={column.key}>
									<HeaderComponent column={column}/>
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
									const CellComponent = cellsMap[columnKey]

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