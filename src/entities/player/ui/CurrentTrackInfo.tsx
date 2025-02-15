'use client'
import NextImage from "next/image"
import { Image } from "@heroui/image"
import React, { useMemo } from "react"
import { Nullable } from "@/shared/lib/Nullable"
import { LinksTextList, LinksTextListProps } from "@/shared/ui/LinksTextList"
import { usePlayerState } from "../model/usePlayerState"
import { FALLBACK_TRACK_IMAGE_URL, TRACK_IMAGE_HEIGHT, TRACK_IMAGE_WIDTH } from "../config"
import { getBestFitImage } from "@/shared/lib/getBestFitImage"
import { getIdFromUri } from "@/shared/lib/getIdFromUri"
import { Link as HeroLink } from "@heroui/link"
import NextLink from "next/link"

// import Link from "next/link"

export const CurrentTrackInfo = () => {
const player = usePlayerState()

	const trackImageUrl = useMemo(() => {
		const imageList = player.data?.track_window.current_track.album.images
			.filter(image => image.height && image.width)

		if (!imageList || !imageList.length) {
			return FALLBACK_TRACK_IMAGE_URL
		}

		const image = getBestFitImage({
			images: imageList,
			preferredSize: {
				width: TRACK_IMAGE_WIDTH,
				height: TRACK_IMAGE_HEIGHT
			}
		})

		if (!image) {
			return FALLBACK_TRACK_IMAGE_URL
		}

		return image.url
	}, [player.data?.track_window.current_track])

	const artistLinks: LinksTextListProps['links'] | null = useMemo(() => {
		if (!player.data?.track_window.current_track.artists.length) {
			return null
		}

		return player.data?.track_window.current_track.artists.map(artist => ({
			label: artist.name,
			url: `/artist/${getIdFromUri(artist.uri)}`
		}))

	}, [player.data?.track_window.current_track])

	return (
		<div className="flex gap-2">
			<Image
				as={NextImage}
				src={trackImageUrl}
				width={TRACK_IMAGE_WIDTH}
				height={TRACK_IMAGE_HEIGHT}
				className="w-14 h-14"
				alt=""
			/>

			<div className="">
				<p className="truncate">
					<HeroLink as={NextLink} href={`/dashboard/album/${getIdFromUri(player.data.track_window.current_track.album.uri)}`}>
					{player.data.track_window.current_track.name}
					</HeroLink>
				</p>

				<p>
					{artistLinks ?
						(<LinksTextList links={artistLinks} />)
						:
						'No artists'
					}
				</p>
			</div>
		</div>
	)
}