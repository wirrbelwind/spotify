'use client'

import { usePlayerController } from "@/providers/spotify-player"
import Script from "next/script"
import { useEffect } from "react"
import { rememberDeviceId } from "../model/actions/rememberDeviceId"

interface PlayerInitProps {
	token: string
}

export const PlayerInit: React.FC<PlayerInitProps> = ({ token }) => {
	const playerContext = usePlayerController()

	useEffect(() => {
		window.onSpotifyWebPlaybackSDKReady = async () => {
			const controller = new window.Spotify.Player({
				name: 'Web Playback SDK',
				getOAuthToken: cb => cb(token),
				volume: 0.5
			});

			playerContext?.setController(controller);

			controller.addListener('ready', (ctx) => {
				console.log('Ready with Device ID', ctx);
				rememberDeviceId(ctx.device_id)
			});

			controller.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			controller.addListener('player_state_changed', qwe => {
			})
			const isPlayerConnected = await controller.connect()

			if (isPlayerConnected) {
				playerContext?.setController(controller)
			}
		};

		return () => {
			playerContext?.controller?.disconnect()
			playerContext?.setController(null)
		}
	}, [token])

	return (
		<>
			<Script src="https://sdk.scdn.co/spotify-player.js" />
		</>
	)
}