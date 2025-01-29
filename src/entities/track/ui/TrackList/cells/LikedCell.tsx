'use client'

import { Button } from "@nextui-org/button"
import { CellProps } from "../types"
import { Spinner } from "@nextui-org/spinner"

export const LikedCell: React.FC<CellProps> = ({ likes, trackIndex }) => {
	const isLiked = likes?.[trackIndex]

	return (
		<Button>
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
