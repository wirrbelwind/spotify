'use client'

import { usePlaybackState, usePlayerDevice, useSpotifyPlayer, WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { Button } from "@nextui-org/button";
import { useMemo } from "react";
import { Image } from "@nextui-org/image";

export const Player = () => {
	const player = useSpotifyPlayer()
	const playback = usePlaybackState(true, 1000)
	const device = usePlayerDevice()

	const isDeviceAvailable = useMemo(() => {
		if (device?.status === 'ready' && device?.device_id && playback?.context.uri) {
			return true
		}
		return false
	}, [device?.status, device?.device_id, playback?.context.uri])

	const handlePlay = () => {
		if (!isDeviceAvailable) {
			throw new Error(`Player's device is null, but action "play" is still callable`)
		}
		player?.togglePlay()
	}

	const handlePrev = () => {
		if (!isDeviceAvailable) {
			throw new Error(`Player's device is null, but action "prev" is still callable`)
		}

		// player?.previousTrack()
		
		if(playback?.position > 3000) {
			player?.seek(0)
		} else {
			player?.previousTrack()
		}
	}

	const handleNext = () => {
		if (!isDeviceAvailable) {
			throw new Error(`Player's device is null, but action "prev" is still callable`)
		}

		
		// player?.previousTrack()
		player?.nextTrack()
	}

	return (
		<div>
			{!player && (<div>loading</div>)}
			{player && (<div>
				<form>
					{/* <Button type="submit">
						Play Carly Rae Jepsen
					</Button> */}
					<Button
						onPress={handlePrev}
						isDisabled={!isDeviceAvailable}
						isIconOnly
						className=" bg-none"
					>
						prev
					</Button>

					<Button
						onPress={handlePlay}
						isDisabled={!isDeviceAvailable}
						isIconOnly
						className=" bg-none"
					>
						{playback?.paused ? (
							<Image src="/play.svg" className="w-10 h-10" alt="" />
						) : (
							<Image src="/pause.svg" alt="" className="w-10 h-10" />
						)}
					</Button>
					<Button
						onPress={handleNext}
						isDisabled={!isDeviceAvailable}
						isIconOnly
						className=" bg-none"
					>
						next
					</Button>
					{playback?.position}
				</form>

				<p>{playback?.track_window.current_track.name}</p>
			</div>)}
		</div>
	)
}
