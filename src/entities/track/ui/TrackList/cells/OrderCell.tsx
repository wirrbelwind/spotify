'use client'
import { startAudioAction } from "@/entities/player/model/actions/startAudioAction"
import { usePlayerState } from "@/entities/player/model/usePlayerState"
import { usePlayerController } from "@/providers/spotify-player"
import { EqualizerIcon } from "@/ui/EqualizerIcon"
import { Button } from "@nextui-org/button"
import Image from "next/image"

export const OrderCell: React.FC = ({ track, allTracks }) => {
	const controllerContext = usePlayerController()
	const player = usePlayerState()

	const uriList = allTracks.map(otherTrack => otherTrack.uri)

	const handlePlay = () => {
		if (player.data?.track_window.current_track.uri === track.uri && !player.data?.paused) {
			controllerContext?.controller?.pause()
		}
		else {
			startAudioAction({
				audioUris: uriList,
				offset: track.uri
			})
		}
	}

	return (
		<Button
			isIconOnly
			className=""
			variant="light"
			onPress={handlePlay}
		>
			<div className="group-hover/track:hidden">
				{player.data?.track_window.current_track.uri === track.uri ? (
					<EqualizerIcon />
				) : (<p

				>
					{track.order}
				</p>)
				}
			</div>



			{(player.data?.track_window.current_track.uri === track.uri && !player.data?.paused) ? (
				<Image src="/pause.svg" width={30} height={30} alt="" className="hidden group-hover/track:block" />
			) : (
				<Image src="/play.svg" width={30} height={30} alt="" className="hidden group-hover/track:block" />
			)}
		</Button>
	)
}