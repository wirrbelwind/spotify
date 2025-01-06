'use client'
import 'client-only'
import { queryOptions } from "@tanstack/react-query"
import { getPlayerState } from "./actions/getPlayerState"

export const playerStateOptions = (controller?: Spotify.Player | null) => {
	return queryOptions({
		enabled: Boolean(controller),
		queryKey: ['player', 'state'],
		// queryFn: getPlayerState,
		queryFn: async () => {
			console.log('fetch')
			return controller?.getCurrentState()
		},
		// staleTime: 1000, // 12 hours,
		refetchInterval(query) {
			if (!query.state.data || query.state.data?.paused) {
				console.log('stop refetching',query.state.data)
				return false
			}
			console.log('refetch after 1 sec')
			return 1000
		},
	})
}
