'use client'
import { userTopTracksOptions } from "@/api/userTopTracks";
import { TrackObject } from "@/app/types";
import { millisecondsToTime } from "@/utils/millisecondsToTime";
import { Button, Image, Link } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type ColumnType = 'order' | 'avatar' | 'name' | 'album' | 'liked' | 'duration'

const columns: { key: ColumnType, label: string }[] = [
	{
		key: "order",
		label: "ORDER",
	},
	{
		key: "avatar",
		label: "AVATAR",
	},
	{
		key: "name",
		label: "NAME",
	},
	{
		key: "album",
		label: "ALBUM",
	},
	{
		key: "liked",
		label: "LIKED",
	},
	{
		key: "duration",
		label: "DURATION",
	},
];

export const OrderCell: React.FC = ({ track, allTracks }) => {
	// const device = usePlayerDevice()
	// const playback = usePlaybackState(true, 1000)
	// const player = useSpotifyPlayer()

	const uriList = allTracks.map(otherTrack => otherTrack.uri)

	// const isCurrentPlayback = playback?.context.uri === track.uri

	const handlePlay = () => {
		// if (device?.status === 'ready' && device.device_id) {
		// 	if (isCurrentPlayback) {
		// 		// toggle pause play
		// 		player?.togglePlay()
		// 	}
		// 	else {
		// 		PlayerEntity.startAudio(device.device_id, null, uriList, track.uri)
		// 	}
		// }
	}

	return (
		<Button
			isIconOnly
			className=""
			onPress={handlePlay}
		>
			<p className="group-hover:hidden">
				{track.order}
			</p>
			{/* <Image
				src="/play.svg"
				className="hidden group-hover:block"
			/> */}
			{/* {(!isCurrentPlayback || (isCurrentPlayback && playback.paused)) ? (
				<Image src="/play.svg" width={30} height={30} alt="" className="hidden group-hover:block" />
			) : (
				<Image src="/pause.svg" width={30} height={30} alt="" className="hidden group-hover:block" />
			)} */}
		</Button>
	)
}

export const NameCell: React.FC = ({ track }) => {
	return (
		<div>
			<p>{track.name}</p>
			<p>
				{track.artists.map((artist, index) => (
					<React.Fragment key={index}>
						<Link href="">{artist.name}</Link>
						{index !== track.artists.length - 1 && (
							<p>, </p>
						)}
					</React.Fragment>
				))}
			</p>
		</div>
	)
}

export const AvatarCell: React.FC = ({ track }) => {
	return (
		<Image
			src={track.album.images[0].url}
			width={60}
			height={60}
		/>
	)
}

export const AlbumCell: React.FC = ({ track }) => {
	return (
		<Link href="">{track.album.name}</Link>
	)
}

export const LikedCell: React.FC = ({ track }) => {
	return (
		<Button>coming soon</Button>
	)
}

export const DurationCell: React.FC = ({ track }) => {
	return (
		<p>{millisecondsToTime(track.duration_ms)}</p>
	)
}

const columnComponentMap: Record<ColumnType, React.FC> = {
	'order': OrderCell,
	'avatar': AvatarCell,
	'name': NameCell,
	'album': AlbumCell,
	'liked': LikedCell,
	'duration': DurationCell
}

/**
 * @type client component
 */
export const TrackList = () => {
	// const trackList = tracks.map((track, index) => ({
	// 	...track,
	// 	order: index + 1
	// }))
	const trackList = useQuery(userTopTracksOptions(10))

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
					<TableHeader columns={columns}>
						{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
					</TableHeader>

					<TableBody items={trackList.data.items}>
						{(track) => (
							<TableRow
								key={track.id}
								className="hover:bg-gray-400 group"
							>
								{(columnKey) => {
									const CellComponent = columnComponentMap[columnKey]

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
