import { useCallback, useMemo } from "react"
import { usePlaybackState, usePlayerDevice, useSpotifyPlayer } from "react-spotify-web-playback-sdk"
import { shuffleAction } from "./actions/shuffleAction"

export const usePlayer = () => {
	const player = useSpotifyPlayer()

	const playback = usePlaybackState(true, 1000)
	const device = usePlayerDevice()

	const isPlayerReady = useMemo(() => {
		console.log(device?.status, device?.device_id)
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
		await shuffleAction(!playback?.shuffle, device?.device_id)
	}, [])

	const handleRewind = useCallback(async (newPosition: number) => {
		await player?.seek(newPosition)
	}, [])

	return {
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
	}
}