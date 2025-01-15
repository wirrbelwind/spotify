'use client'

import { TrackList } from "@/entities/track";
import { getPlaylistOptions } from "@/entities/track/api/playlist/getPlaylistOptions";
import { getBestFitImage } from "@/shared/lib/getBestFitImage";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC } from "react";

interface PlaylistTemplateProps {
	// image: {
	// 	url?: string
	// }
	// name: string
	playlistId: string
}

export const PlaylistTemplate: FC<PlaylistTemplateProps> = ({ playlistId }) => {
	const playlist = useQuery(getPlaylistOptions(playlistId))
	
	return (
		<div>
			<div className="flex gap-4">
				{playlist.isSuccess && (<>
					<Image
						width={144}
						height={144}
						src={playlist.data.images[0].url}
						alt="playlist image"
						className="object-cover w-36 h-36"
					/>

					<div>
						<p>{playlist.data.name}</p>
					</div>
				</>)}

				{playlist.isLoading && (
					<Spinner />
				)}
			</div>
			<TrackList 
				tracks={{
					data: playlist.data?.tracks,
					isError: playlist.isError,
					isLoading: playlist.isLoading
				}}
				columns={[
					'order',
					'avatar',
					'name',
					'album',
					'liked',
					'duration'
				]}
			/>
		</div>
	)
}
