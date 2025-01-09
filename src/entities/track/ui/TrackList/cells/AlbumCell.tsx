import NextLink from "next/link"
import { Link } from "@nextui-org/react"


export const AlbumCell: React.FC = ({ track }) => {
	return (
		<Link as={NextLink} href="">{track.album.name}</Link>
	)
}
