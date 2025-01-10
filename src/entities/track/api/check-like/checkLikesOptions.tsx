import { queryOptions, useQuery } from "@tanstack/react-query"
import { checkLikedTracks } from "./checkLikedTracks"

interface CheckLikesOptionsArgs {
	enabled: boolean
	idList?: string[]
}

export const checkLikesOptions = ({ enabled, idList }: CheckLikesOptionsArgs) => {

	return queryOptions({
		enabled: enabled && Boolean(idList),
		queryKey: ['check', 'likes', idList],
		queryFn: () => checkLikedTracks(idList as string[]),
		staleTime: 1000 * 60 * 10,
	})
}
