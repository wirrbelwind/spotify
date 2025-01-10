import { usePlayerController } from "@/shared/providers/spotify-player"
import { useMutation } from "@tanstack/react-query"

export const useChangeVolume = () => {
	const controllerCtx = usePlayerController()

	return useMutation<unknown, unknown, { newValue: number }>({
		mutationKey: ['player', 'volume'],
		mutationFn: async ({ newValue }) => {
			await controllerCtx?.controller?.setVolume(newValue)
		}
	})
}