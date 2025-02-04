import NextLink from "next/link"
import { CellProps } from "../types"
import { Link } from "@heroui/link"

export const AlbumCell: React.FC<CellProps> = ({ track, withPlaylistData }) => {
	return (
		<Link as={NextLink} href="">{track.album.name}</Link>
	)
}
