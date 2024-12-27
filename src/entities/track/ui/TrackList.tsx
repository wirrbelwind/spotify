'use client'
import { TrackObject } from "@/app/types";
import { playerServerActions, usePlayer } from "@/entities/player";
import { useCustomPlayer } from "@/providers/custom-spotify-player-context";
import { millisecondsToTime } from "@/utils/millisecondsToTime";
import { Button, Image, Link } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import React from "react";
import { usePlaybackState, usePlayerDevice, useSpotifyPlayer } from "react-spotify-web-playback-sdk";
import { PlaybackStateProvider } from "react-spotify-web-playback-sdk/dist/playbackState";

interface TrackListProps {
	tracks: TrackObject[]
}

interface ColumnCellProps {
	track: TrackObject
	trackList: TrackObject[]
	playback: Spotify.PlaybackState | null
}

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

export const OrderCell: React.FC<ColumnCellProps> = ({ track, trackList, playback }) => {
	// const device = usePlayerDevice()
	// const playback = usePlaybackState(true, 1000)
	// const player = useSpotifyPlayer()
	const player = usePlayer()

	// const uriList = trackList.map(anotherTrack => anotherTrack.uri)

	const isPlayingTrack = track.uri === playback?.track_window.current_track.uri

	const handlePlay = () => {
		// if()

		if (player.isPlayerReady) {
			if (player.isSomethingPlaying) {
				// toggle pause play
				player.actions.togglePause()
			}
			else {
				playerServerActions.startAudioAction(player._library.device?.device_id, null, trackList.map(tr => tr.uri), track.uri)
			}
		}
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
			{(!isPlayingTrack || (isPlayingTrack && playback.paused)) ? (
				<Image src="/play.svg" width={30} height={30} alt="" className="hidden group-hover:block" />
			) : (
				<Image src="/pause.svg" width={30} height={30} alt="" className="hidden group-hover:block" />
			)}
		</Button>
	)
}

export const NameCell: React.FC<ColumnCellProps> = ({ track }) => {
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

export const AvatarCell: React.FC<ColumnCellProps> = ({ track }) => {
	return (
		<Image
			src={track.album.images[0].url}
			width={60}
			height={60}
		/>
	)
}

export const AlbumCell: React.FC<ColumnCellProps> = ({ track }) => {
	return (
		<Link href="">{track.album.name}</Link>
	)
}

export const LikedCell: React.FC<ColumnCellProps> = ({ track }) => {
	return (
		<Button>coming soon</Button>
	)
}

export const DurationCell: React.FC<ColumnCellProps> = ({ track }) => {
	return (
		<p>{millisecondsToTime(track.duration_ms)}</p>
	)
}

const columnComponentMap: Record<ColumnType, React.FC<ColumnCellProps>> = {
	'order': OrderCell,
	'avatar': AvatarCell,
	'name': NameCell,
	'album': AlbumCell,
	'liked': LikedCell,
	'duration': DurationCell
}

export const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
	const player = usePlayer()

	// const uriList = tracks.map(track => track.uri)
	const customPlayer = useCustomPlayer()
	console.log('custom player log', customPlayer)
	return (
		<Table aria-label="Example static collection table" >
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>

			<TableBody items={tracks}>
				{(track) => (
					<TableRow
						key={track.id}
						className="hover:bg-gray-400 group"
					>
						{(columnKey) => {
							const CellComponent = columnComponentMap[columnKey as ColumnType]

							return (
								<TableCell>
									<CellComponent
										track={track}
										trackList={tracks}
										playback={player._library.playback}
									/>
								</TableCell>
							)
						}}
					</TableRow>
				)}

			</TableBody>
		</Table>
	);
}
