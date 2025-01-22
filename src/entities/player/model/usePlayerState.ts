import { usePlayerController } from "@/shared/providers/spotify-player"
import { queryOptions, useQuery } from "@tanstack/react-query"

// todo
export const playerStateOptions = (controller?: Spotify.Player | null) => {
	return queryOptions({
		enabled: Boolean(controller),
		queryKey: ['player', 'state'],
		queryFn: controller?.getCurrentState
	})
}


export const usePlayerState = () => {
	const controller = usePlayerController()
	return useQuery(playerStateOptions(controller))
}
