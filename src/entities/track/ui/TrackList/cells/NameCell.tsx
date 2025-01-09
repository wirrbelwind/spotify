import Link from "next/link"
import React from "react"

export const NameCell: React.FC = ({ track }) => {
	return (
		<div>
			<p>{track.name}</p>
			<p>
				{track.artists.map((artist, index) => (
					<React.Fragment key={index}>
						<Link href="">{artist.name}</Link>
						{index !== track.artists.length - 1 && (
							<p>, </p>
						)}
					</React.Fragment>
				))}
			</p>
		</div>
	)
}