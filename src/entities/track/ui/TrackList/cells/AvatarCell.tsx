import Image from "next/image"

export const AvatarCell: React.FC = ({ track }) => {
	return (
		<Image
			src={track.album.images[0].url}
			width={60}
			height={60}
		/>
	)
}