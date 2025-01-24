'use client'
import { usePlayerState } from "@/entities/player/model/usePlayerState"
import { usePlayerController } from "@/shared/providers/spotify-player"
import { Button } from "@nextui-org/button"
import Image from "next/image"
import { CellProps } from "../types"
import { startAudio } from "@/entities/player"
import { EqualizerIcon } from "@/shared/ui/EqualizerIcon"

export const OrderCell: React.FC<CellProps> = ({ track, allTracks, trackIndex, }) => {
	
	const controller = usePlayerController()
	const player = usePlayerState()

	const uriList = allTracks.map(otherTrack => otherTrack.uri)

	const handlePlay = () => {
		if (player.data?.track_window.current_track.uri === track.uri && !player.data?.paused) {
			controller?.pause()
		}
		else {
			startAudio({
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
				) : (
					<p>
						{trackIndex + 1}
					</p>)
				}
			</div>



			{(player.data?.track_window.current_track.uri === track.uri && !player.data?.paused) ? (
				<Image src="/icons/pause.svg" width={26} height={26} alt="" className="hidden group-hover/track:block" />
			) : (
				<Image src="/icons/play.svg" width={26} height={26} alt="" className="hidden group-hover/track:block" />
			)}
		</Button>
	)
}