'use client'

import { getPlaylistOptions } from "@/entities/track/api/playlist/getPlaylistOptions"
import { getBestFitImage } from "@/shared/lib/getBestFitImage"
import { Spinner } from "@nextui-org/spinner"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { FC, useMemo } from "react"

interface HeaderProps {
	playlistId: string
}

export const Header: FC<HeaderProps> = ({ playlistId }) => {
	const playlist = useQuery(getPlaylistOptions(playlistId))

	const image = useMemo(() => {
		if (!playlist.isSuccess) {
			return null
		}

		return getBestFitImage({
			images: playlist.data?.images,
			preferredSize: { width: 150, height: 150 }
		})
	}, [playlist.data])

	return (
		<div className="flex gap-4 items-center py-8 px-4">
			{playlist.isLoading && !playlist.data && (
				<Spinner />
			)}
			{playlist.isSuccess && <>
				<Image
					src={image?.url ?? ''}
					alt="Playlist's avatar"
					width={160}
					height={160}
					className="object-cover w-40 h-40"
				/>
				<div className="flex gap-2 flex-col">
					<p>
						{
							playlist.data.public ? 'Public playlist' : 'Private playlist'
						}
					</p>
					<p className="text-6xl font-bold">
						{playlist.data?.name}
					</p>
					<p className="text-gray-400">{playlist.data?.description}</p>
					{playlist.data?.collaborative && <p>Collaborative</p>}
					<p className="font-bold">
						<a href={`/dashboard/artist/${playlist.data.owner.id}`}>{playlist.data.owner.display_name}</a>
						<span> • </span>
						<span>{playlist.data.tracks.total} songs</span>
					</p>
				</div>
			</>}
		</div>
	)
}
