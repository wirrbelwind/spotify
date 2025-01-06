import { queryOptions } from "@tanstack/react-query"
import { getPlayerState } from "./actions/getPlayerState"

export const playerStateOptions = () => {
	return queryOptions({
		queryKey: ['player', 'state'],
		queryFn: getPlayerState,
		// staleTime: 1000, // 12 hours,
		refetchInterval: 1000
	})
}
