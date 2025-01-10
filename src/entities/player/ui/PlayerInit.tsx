'use client'

import { usePlayerController } from "@/shared/providers/spotify-player"
import Script from "next/script"
import { useEffect } from "react"
import { rememberDevice } from "../model/rememberDevice"
import { useQueryClient } from "@tanstack/react-query"
import { playerStateOptions } from "../model/playerStateOptions"
import { INITIAL_VOLUME, PLAYER_NAME } from "../constants"

interface PlayerInitProps {
	token: string
}

export const PlayerInit: React.FC<PlayerInitProps> = ({ token }) => {
	const playerContext = usePlayerController()
	const queryClient = useQueryClient()

	useEffect(() => {
		window.onSpotifyWebPlaybackSDKReady = async () => {
			const controller = new window.Spotify.Player({
				name: PLAYER_NAME,
				getOAuthToken: cb => cb(token),
				volume: INITIAL_VOLUME
			});

			playerContext?.setController(controller);

			controller.addListener('ready', (ctx) => {
				console.log('Ready with Device ID', ctx);
				rememberDevice(ctx.device_id)
			});

			controller.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			controller.addListener('player_state_changed', changedState => {
				// console.log('fetch')

				queryClient.setQueryData(playerStateOptions().queryKey, changedState)
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