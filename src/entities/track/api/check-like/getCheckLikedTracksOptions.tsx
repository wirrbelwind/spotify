import { queryOptions, useQuery } from "@tanstack/react-query"
import { checkLikedTracks } from "./checkLikedTracks"

interface GetCheckLikedTracksOptionsArgs {
	enabled: boolean
	idList?: string[]
}

export const getCheckLikedTracksOptions = ({ enabled, idList }: GetCheckLikedTracksOptionsArgs) => {

	return queryOptions({
		enabled: enabled && Boolean(idList),
		queryKey: ['check', 'likes', idList],
		queryFn: () => checkLikedTracks(idList as string[]),
		staleTime: 1000 * 60 * 10,
	})
}
