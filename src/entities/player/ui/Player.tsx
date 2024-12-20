'use client'

import { useMemo } from "react";
import { usePlayer } from "@/entities/player";
import { Spinner } from "@nextui-org/spinner";
import { CurrentTrackInfo } from "./CurrentTrackInfo";
import { ActionButtons } from "./ActionButtons";
import { TrackTimeline } from "./TrackTimeline";
import { LinksTextListProps } from "@/ui/LinksTextList";
import { getIdFromUri } from "@/utils/getIdFromUri";

export const Player = () => {
	const player = usePlayer()

	const artistLinks: LinksTextListProps['links'] | null = useMemo(() => {
		if (!player._library.playback?.track_window.current_track.artists.length) {
			return null
		}

		return player._library.playback.track_window.current_track.artists.map(artist => ({
			label: artist.name,
			url: `/artist/${getIdFromUri(artist.uri, 'artist')}`
		}))

	}, [player._library.playback?.track_window.current_track])

	return (
		<div>
			{!player.isPlayerReady && (
				<Spinner
					color="success"
					label="Please wait. Your player is loading..."
					labelColor="success"
				/>
			)}
			{player.isPlayerReady && (
				<div>
					<div className="flex">
						{player.isSomethingPlaying && (
							<CurrentTrackInfo
								name={player._library.playback?.track_window.current_track.name as string}
								imageUrl={player._library.playback?.track_window.current_track.album.images[0].url}
								artists={artistLinks}
							/>
						)}

						<div className="basis-full">
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
					</div>

				</div>
			)}
		</div>
	)
}
