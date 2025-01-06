'use client'

import { Button } from "@nextui-org/button"
import Script from "next/script"
import { useEffect, useRef, useState } from "react"
import { startAudioAction } from "../model/actions/startAudioAction"
import { useQuery } from "@tanstack/react-query"
import { playerStateOptions } from "../model/playerStateOptions"
import { rememberDeviceId } from "../model/actions/rememberDeviceId"

// import { useMemo } from "react";
// import { usePlayer } from "@/entities/player";
// import { Spinner } from "@nextui-org/spinner";
// import { CurrentTrackInfo } from "./CurrentTrackInfo";
// import { ActionButtons } from "./ActionButtons";
// import { TrackTimeline } from "./TrackTimeline";
// import { LinksTextListProps } from "@/ui/LinksTextList";
// import { getIdFromUri } from "@/utils/getIdFromUri";
// import { getBestFitImage } from "@/utils/getBestFitImage";
// import { FALLBACK_TRACK_IMAGE_URL, TRACK_IMAGE_HEIGHT, TRACK_IMAGE_WIDTH } from "../model/constants";

// export const Player = () => {
// 	const player = usePlayer()

// 	const artistLinks: LinksTextListProps['links'] | null = useMemo(() => {
// 		if (!player._library.playback?.track_window.current_track.artists.length) {
// 			return null
// 		}

// 		return player._library.playback.track_window.current_track.artists.map(artist => ({
// 			label: artist.name,
// 			url: `/artist/${getIdFromUri(artist.uri, 'artist')}`
// 		}))

// 	}, [player._library.playback?.track_window.current_track])

// 	const trackImageUrl = useMemo(() => {
// 		const imageList = player._library.playback?.track_window.current_track.album.images
// 			.filter(image => image.height && image.width)

// 		if (!imageList || !imageList.length) {
// 			return FALLBACK_TRACK_IMAGE_URL
// 		}

// 		const image = getBestFitImage({
// 			images: imageList,
// 			preferredSize: {
// 				width: TRACK_IMAGE_WIDTH,
// 				height: TRACK_IMAGE_HEIGHT
// 			}
// 		})

// 		if (!image) {
// 			return FALLBACK_TRACK_IMAGE_URL
// 		}

// 		return image.url
// 	}, [player._library.playback?.track_window.current_track])

// 	return (
// 		<div>
// 			{!player.isPlayerReady && (
// 				<Spinner
// 					color="success"
// 					label="Please wait. Your player is loading..."
// 					labelColor="success"
// 				/>
// 			)}
// 			{player.isPlayerReady && (
// 				<div className="flex">
// 					{player.isSomethingPlaying && (
// 						<CurrentTrackInfo
// 							name={player._library.playback?.track_window.current_track.name as string}
// 							image={{
// 								url: trackImageUrl,
// 								width: TRACK_IMAGE_WIDTH,
// 								height: TRACK_IMAGE_HEIGHT,
// 							}}
// 							artists={artistLinks}
// 						/>
// 					)}

// 					<div className="basis-full">
// 						<ActionButtons
// 							elementsProps={{
// 								wrapper: {
// 									className: 'flex gap-4  items-center justify-center'
// 								}
// 							}}
// 						/>

// 						<TrackTimeline
// 							elementsProps={{
// 								wrapper: {
// 									className: "flex items-center justify-center gap-2"
// 								}
// 							}}
// 						/>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	)
// }
interface PlayerProps {
	token: string
}

export const Player: React.FC<PlayerProps> = ({ token }) => {
	const [player, setPlayer] = useState<null | Spotify.Player>(null)
	const [deviceId, setDeviceId] = useState<null | string>(null)
	useEffect(() => {
		window.onSpotifyWebPlaybackSDKReady = () => {

			const newPlayer = new window.Spotify.Player({
				name: 'Web Playback SDK',
				getOAuthToken: cb => { cb(token); },
				volume: 0.5
			});

			setPlayer(newPlayer);
			
			newPlayer.addListener('ready', (ctx) => {
				console.log('Ready with Device ID', ctx);
				rememberDeviceId(ctx.device_id)
			});

			newPlayer.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			newPlayer.addListener('player_state_changed', qwe => {
				console.log(qwe)
			})
			newPlayer.connect()
		};
	}, [])

	
	// const playerQuery = useQuery(playerStateOptions())
	
	// console.log(playerQuery.data)

	return (
		<>
			<Script src="https://sdk.scdn.co/spotify-player.js" />
			{/* <Button onPress={() => {
				console.log(deviceId)
				startAudioAction('spotify:album:5ht7ItJgpBH7W6vJ5BqpPr')
			}}>ok</Button> */}

			{/* <h1>{playerQuery.data?.position} / {playerQuery.data?.duration}</h1> */}

			

			{/* <h1>isRefetching: {String(playerQuery.isRefetching)}</h1> */}
		</>
	)
}
