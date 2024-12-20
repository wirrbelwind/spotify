import { LinksTextList } from "@/ui/LinksTextList"
import NextImage from "next/image"
import { Image } from "@nextui-org/image"
import React from "react"

interface PlayerCurrentTrackProps {
	name: string
	imageUrl?: string
	artists?: Array<{
		label: string
		url: string
	}> | null
}

export const CurrentTrackInfo: React.FC<PlayerCurrentTrackProps> = ({ artists, name, imageUrl }) => {
	return (
		<div>
			<Image
				as={NextImage}
				src={imageUrl}
				width={80}
				height={80}
				className="w-20 h-20"
				alt=""
			/>

			<p>
				{name ?? 'No track name'}
			</p>

			<p>
				{artists ?
					(<LinksTextList links={artists} />)
					:
					'No artists'
				}
			</p>
		</div>
	)
}