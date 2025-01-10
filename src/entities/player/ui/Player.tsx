'use client'

import { useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { usePlayerController } from "@/shared/providers/spotify-player"
import { TrackTimeline } from "./Timeline"
import { ActionButtons } from "./ActionButtons"
import { usePlayerState } from "../model/usePlayerState"
import { CurrentTrackInfo } from "./CurrentTrackInfo"
import { FALLBACK_TRACK_IMAGE_URL, TRACK_IMAGE_HEIGHT, TRACK_IMAGE_WIDTH } from "../config"
import { getBestFitImage } from "@/shared/lib/getBestFitImage"
import { LinksTextListProps } from "@/ui/LinksTextList"
import { getIdFromUri } from "@/shared/lib/getIdFromUri"
import { Volume } from "./Volume"

export const Player = () => {
	const queryClient = useQueryClient()
	const player = usePlayerState()
	const controllerContext = usePlayerController()

	const trackImageUrl = useMemo(() => {
		console.log(player.data?.context)
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
			url: `/artist/${getIdFromUri(artist.uri, 'artist')}`
		}))

	}, [player.data?.track_window.current_track])

	return (
		<div className="px-4 py-2 grid grid-rows-1 grid-cols-[1fr_3fr_1fr] items-center">
			<div className="">
				{
					player.data && (
						<CurrentTrackInfo
							name={player.data?.track_window.current_track.name}
							image={{
								url: trackImageUrl,
								width: TRACK_IMAGE_WIDTH,
								height: TRACK_IMAGE_HEIGHT,
							}}
							artists={artistLinks}
						/>
					)
				}
			</div>

			<div className="">
				<ActionButtons
					elementsProps={{
						wrapper: {
							className: 'flex gap-4  items-center justify-center'
						}
					}}
				/>

				<TrackTimeline
					elementsProps={{
						wrapper: {
							className: "flex items-center justify-center gap-2"
						}
					}}
				/>


			</div>

			<div>
				<Volume />
			</div>
		</div>
	)
}
