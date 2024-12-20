'use client'

import { usePlaybackState, usePlayerDevice, useSpotifyPlayer, WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { Button } from "@nextui-org/button";
import { useMemo } from "react";
import { Image } from "@nextui-org/image";
import PlayerEntity from "@/entities/player";
import { Slider } from "@nextui-org/slider";
import { millisecondsToTime } from "@/utils/millisecondsToTime";

export const Player = () => {
	const player = useSpotifyPlayer()
	const playback = usePlaybackState(true, 1000)
	const device = usePlayerDevice()

	const isDeviceAvailable = useMemo(() => {
		console.log(device?.status,device?.device_id)
		if (device?.status === 'ready' && device?.device_id) {
			return true
		}
		return false
	}, [device?.status, device?.device_id])

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

		if (playback?.position > 3000) {
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

	const handleShuffle = () => {
		PlayerEntity.shuffle(!playback?.shuffle, device?.device_id)
	}

	const handleRewind = (newValue: number) => {
		player?.seek(newValue)
	}


	return (
		<div>
			{!player && (<div>loading</div>)}
			{player && (<div>
				<div className="flex">
					<div>
						<Image
							src={playback?.track_window.current_track.album.images[0].url}
							className="w-20 h-20"
						/>
						<p>{playback?.track_window.current_track.name}</p>
						<p>{playback?.track_window.current_track.artists.map(artist => `${artist.name},`)}</p>
					</div>

					<div className="basis-full">
						<div
							className="flex gap-4  items-center justify-center"
						>
							{/* <Button type="submit">
						Play Carly Rae Jepsen
					</Button> */}
							<Button
								onPress={handleShuffle}
								isDisabled={!isDeviceAvailable}
								isIconOnly
								className=" bg-none"
							>
								{playback?.shuffle ? 'shuffle on' : 'shuffle off'}
							</Button>

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
								className=""
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

						</div>

						<div className="flex items-center justify-center gap-2">
							<p>{millisecondsToTime(playback?.position)}</p>
							<Slider
								className="max-w-md"
								value={playback?.position}
								maxValue={playback?.duration}
								minValue={0}
								step={1}
								onChangeEnd={handleRewind}
							/>
							<p>{millisecondsToTime(playback?.duration)}</p>

						</div>
					</div>
				</div>

			</div>)}
		</div>
	)
}
