'use client'

import { rememberDevice } from "@/entities/player";
import { INITIAL_VOLUME, PLAYER_NAME } from "@/entities/player/constants";
import { playerStateOptions } from "@/entities/player/model/usePlayerState";
import { useQueryClient } from "@tanstack/react-query";
import Script from "next/script";
import { createContext, PropsWithChildren, use, useEffect, useRef } from "react";

const PlayerControllerContext = createContext<Spotify.Player | null>(null)

interface SpotifyPlayerProviderProps extends PropsWithChildren {
	accessToken: string | null
}

export const SpotifyPlayerProvider: React.FC<SpotifyPlayerProviderProps> = ({ children, accessToken }) => {
	const controller = useRef<Spotify.Player | null>(null)

	const queryClient = useQueryClient()

	useEffect(() => {
		window.onSpotifyWebPlaybackSDKReady = async () => {
			if(!accessToken) {
				throw new Error('no access token to initialize player instance')
			}

			controller.current = new window.Spotify.Player({
				name: PLAYER_NAME,
				getOAuthToken: cb => cb(accessToken),
				volume: INITIAL_VOLUME
			});

			controller.current.addListener('ready', (ctx) => {
				console.log('Ready with Device ID', ctx);
				rememberDevice(ctx.device_id)
			});

			controller.current.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			controller.current.addListener('player_state_changed', changedState => {
				queryClient.setQueryData(playerStateOptions().queryKey, changedState)
			})
			const isPlayerConnected = await controller.current.connect()
		};

		return () => {
			controller.current?.disconnect()
		}
	}, [accessToken])

	return (
		<PlayerControllerContext.Provider value={controller.current}>
			<Script src="https://sdk.scdn.co/spotify-player.js" />
			{children}
		</PlayerControllerContext.Provider>
	)
}

export const usePlayerController = () => use(PlayerControllerContext)
