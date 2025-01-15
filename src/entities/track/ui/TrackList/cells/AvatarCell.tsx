import Image from "next/image"
import { CellProps } from "../types"

export const AvatarCell: React.FC<CellProps> = ({ track }) => {
	return (
		<Image
			src={track.album.images[0]?.url}
			width={40}
			height={40}
			alt={`Image of album ${track.album.name}`}
		/>
	)
}