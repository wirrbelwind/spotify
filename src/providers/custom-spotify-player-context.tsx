'use client'

import React, { createContext, PropsWithChildren, use, useCallback, useEffect, useMemo, useState } from "react";
import { usePlaybackState, usePlayerDevice, useSpotifyPlayer, WebPlaybackSDK } from "react-spotify-web-playback-sdk";

export const SpotifyCustomContext = createContext(null)

export const useCustomPlayer = () => use(SpotifyCustomContext)

interface SpotifyPlayerCustomProviderProps extends PropsWithChildren {
}

export const SpotifyPlayerCustomProvider: React.FC<SpotifyPlayerCustomProviderProps> = ({ children }) => {

	console.log('context re-render')
	const player = useSpotifyPlayer()

	const playback = usePlaybackState(true, 1000)
	const device = usePlayerDevice()

	const isPlayerReady = useMemo(() => {
		if (device?.status === 'ready' && device?.device_id) {
			return true
		}
		return false
	}, [device?.status, device?.device_id])

	const isSomethingPlaying = useMemo(() => {
		if (isPlayerReady && playback?.track_window.current_track) {
			return true
		}
		return false
	}, [playback?.track_window.current_track, isPlayerReady])

	const togglePause = useCallback(async () => {
		if (!isPlayerReady) {
			throw new Error(`Action "togglePause" is called but player is not in ready state`)
		}
		if (!isSomethingPlaying) {
			throw new Error(`Action "togglePause()" is called but player has no playback to pause/resume. Start to play something, and then call "togglePause()"`)
		}

		await player?.togglePlay()
	}, [isPlayerReady, isSomethingPlaying])

	const handlePrev = useCallback(async () => {
		if (!isPlayerReady) {
			throw new Error(`Player's device is null, but action "prev" is still callable`)
		}

		if (playback?.position && playback.position > 3000) {
			player?.seek(0)
		} else {
			await player?.previousTrack()
		}
	}, [isPlayerReady, playback])

	const handleNext = useCallback(async () => {
		if (!isPlayerReady) {
			throw new Error(`Player's device is null, but action "prev" is still callable`)
		}

		await player?.nextTrack()
	}, [isPlayerReady])

	const handleShuffle = useCallback(async () => {
		// await shuffleAction(!playback?.shuffle, device?.device_id)
		console.log('shuffle')
	}, [])

	const handleRewind = useCallback(async (newPosition: number) => {
		await player?.seek(newPosition)
	}, [])

	// const contextValue = {
	// 	_library: {
	// 		player,
	// 		playback,
	// 		device,
	// 	},

	// 	isPlayerReady,
	// 	isSomethingPlaying,

	// 	actions: {
	// 		togglePause,
	// 		handlePrev,
	// 		handleNext,
	// 		handleShuffle,
	// 		handleRewind
	// 	},
	// }

	const [contextValue, setContextValue] = useState(null)

	useEffect(() => {
		setContextValue({
			_library: {
				player,
				playback,
				device,
			},

			isPlayerReady,
			isSomethingPlaying,

			actions: {
				togglePause,
				handlePrev,
				handleNext,
				handleShuffle,
				handleRewind
			},
		})
	}, [player, playback, device, isSomethingPlaying, isPlayerReady, togglePause, handlePrev,
		handleNext,
		handleShuffle,
		handleRewind])
	// 
	return (
		<SpotifyCustomContext.Provider value={contextValue}>
			{children}
		</SpotifyCustomContext.Provider>
	)
}