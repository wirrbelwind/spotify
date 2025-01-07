import { usePlayerController } from "@/providers/spotify-player"
import { useQuery } from "@tanstack/react-query"
import { playerStateOptions } from "./playerStateOptions"

export const usePlayerState = () => {
	const playerContext = usePlayerController()
	return useQuery(playerStateOptions(playerContext?.controller))
}
