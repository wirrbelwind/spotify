'use client'

import { Button } from "@nextui-org/button"
import { CellProps } from "../types"
import { Spinner } from "@nextui-org/spinner"

export const LikedCell: React.FC<CellProps> = ({ track, likes, trackIndex }) => {
	const isLiked = likes?.[trackIndex]

	// console.log(likes)

	return (
		<Button>
			{/* {isLiked ? JSON.stringify(likes) : 'loading'} */}
			{
				!likes && (
					<Spinner />
				)
			}
			{
				(likes && isLiked) && (
					'liked'
				)
			}
		</Button>
	)
}