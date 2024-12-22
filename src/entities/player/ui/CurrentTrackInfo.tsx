import { LinksTextList } from "@/ui/LinksTextList"
import NextImage from "next/image"
import { Image } from "@nextui-org/image"
import React from "react"
import { Nullable } from "@/app/types"

interface PlayerCurrentTrackProps {
	name: string
	image: {
		url: string
		width: number
		height: number
	}
	artists?: Nullable<{
		label: string
		url: string
	}[]>
}

export const CurrentTrackInfo: React.FC<PlayerCurrentTrackProps> = ({ artists, name, image }) => {

	return (
		<div>
			<Image
				as={NextImage}
				src={image.url}
				width={image.width}
				height={image.height}
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