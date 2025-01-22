import Link from "next/link"
import React from "react"
import { CellProps } from "../types"
import { LinksTextList } from "@/ui/LinksTextList"

export const NameCell: React.FC<CellProps> = ({ track }) => {
	const artists = track.artists.map(artist => ({
		label: artist.name,
		url: artist.href
	}))

	return (
		<div>
			<p>{track.name}</p>
			<p>
				<LinksTextList links={artists} />
			</p>
		</div>
	)
}
