import Image from "next/image"
import { CellProps } from "../types"
import { getBestFitImage } from "@/shared/lib/getBestFitImage"

export const AvatarCell: React.FC<CellProps> = ({ track }) => {
	const avatarSrc = getBestFitImage({
		images: track.album.images,
		preferredSize: { width: 80, height: 80 }
	})?.url ?? ''

	return (
		<Image
			src={avatarSrc}
			width={40}
			height={40}
			alt={`Image of album ${track.album.name}`}
		/>
	)
}
