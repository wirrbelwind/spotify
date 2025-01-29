'use client'

import { Button } from "@nextui-org/button"
import { CellProps } from "../types"
import { Spinner } from "@nextui-org/spinner"
import { useLike } from "@/entities/track/api/like"

export const LikedCell: React.FC<CellProps> = ({ likes, trackIndex, track }) => {
	const isLiked = likes?.[trackIndex]

	const like = useLike()

	const toggleLike = () => {
		if (!isLiked) {
			like.mutate({ ids: [track.id] })
		}
	}

	return (
		<Button onPress={toggleLike}>
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
