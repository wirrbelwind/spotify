import { Link, LinkProps } from "@nextui-org/react"
import LinkNext from "next/link"
import React, { HTMLAttributes } from "react"

export interface LinksTextListProps {
	links: Array<{
		label: string
		url: string
	}>

	linkProps?: LinkProps
}

export const LinksTextList: React.FC<LinksTextListProps> = ({ links, linkProps }) => {
	return (
		<>
			{links.map((link, index) => (<>
				<Link
					key={index}
					as={LinkNext}
					href={link.url}
					{...linkProps}
				>
					{link.label}
				</Link>

				{/* Render comma symbol if link is not last */}
				{index !== links.length - 1 && ', '}
			</>))}
		</>
	)
}