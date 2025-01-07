'use client'
import { userTopTracksOptions } from "@/api/userTopTracksOptions";
import { TrackObject } from "@/app/types";
import { startAudioAction } from "@/entities/player/model/actions/startAudioAction";
import { usePlayerState } from "@/entities/player/model/usePlayerState";
import { usePlayerController } from "@/providers/spotify-player";
import { EqualizerIcon } from "@/ui/EqualizerIcon";
import { millisecondsToTime } from "@/utils/millisecondsToTime";
import { Button, Image, Link } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

type ColumnType = 'order' | 'avatar' | 'name' | 'album' | 'liked' | 'duration'

const columns: { key: ColumnType, label: string }[] = [
	{
		key: "order",
		label: "#",
	},
	{
		key: "avatar",
		label: "Title",
	},
	{
		key: "name",
		label: "",
	},
	{
		key: "album",
		label: "Album",
	},
	{
		key: "liked",
		label: "",
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
	const controllerContext = usePlayerController()
	const player = usePlayerState()

	const uriList = allTracks.map(otherTrack => otherTrack.uri)

	// const isCurrentPlayback = playback?.context.uri === track.uri

	const handlePlay = () => {
		if (player.data?.track_window.current_track.uri === track.uri && !player.data?.paused) {
			controllerContext?.controller?.pause()
		}
		else {
			startAudioAction({
				audioUris: uriList,
				offset: track.uri
			})
		}
	}

	return (
		<Button
			isIconOnly
			className=""
			variant="light"
			onPress={handlePlay}
		>
			<div className="group-hover/track:hidden">
				{player.data?.track_window.current_track.uri === track.uri ? (
					<EqualizerIcon />
				) : (<p

				>
					{track.order}
				</p>)
				}
			</div>



			{(player.data?.track_window.current_track.uri === track.uri && !player.data?.paused) ? (
				<Image src="/pause.svg" width={30} height={30} alt="" className="hidden group-hover/track:block" />
			) : (
				<Image src="/play.svg" width={30} height={30} alt="" className="hidden group-hover/track:block" />
			)}
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

export const TextColumnHeader: React.FC<{
	column: {
		key: ColumnType;
		label: string;
	}
}> = ({ column }) => {
	return (
		<p>{column.label}</p>
	)
}

const columnHeadComponentMap: Record<ColumnType, React.FC<{
	column: {
		key: ColumnType;
		label: string;
	}
}>> = {
	'order': TextColumnHeader,
	'avatar': TextColumnHeader,
	'name': TextColumnHeader,
	'album': TextColumnHeader,
	'liked': TextColumnHeader,
	'duration': () => <Image src="/time.svg" width={20} height={20} />
}

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
					<TableHeader columns={columns}>
						{(column) => {
							const HeaderComponent = columnHeadComponentMap[column.key]

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
