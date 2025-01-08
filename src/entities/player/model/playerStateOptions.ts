'use client'
import 'client-only'
import { queryOptions } from "@tanstack/react-query"
import { getPlayerState } from "./actions/getPlayerState"

export const playerStateOptions = (controller?: Spotify.Player | null) => {
	return queryOptions({
		enabled: Boolean(controller),
		queryKey: ['player', 'state'],
		queryFn: async () => {
			return controller?.getCurrentState()
		},
		// refetchInterval(query) {
		// 	if (query.state.data?.paused) {
		// 		return false
		// 	}
		// 	else {
		// 		return 1000
		// 	}
		// },
	})
}
