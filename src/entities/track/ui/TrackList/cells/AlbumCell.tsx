import NextLink from "next/link"
import { Link } from "@nextui-org/react"
import { CellProps } from "../types"


export const AlbumCell: React.FC<CellProps> = ({ track, withPlaylistData }) => {
	return (
		<Link as={NextLink} href="">{track.album.name}</Link>
	)
}
