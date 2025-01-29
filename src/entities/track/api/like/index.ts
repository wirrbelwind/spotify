import { spotifyClient } from "@/shared/api/spotify-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLike = () => {
	const queryClient = useQueryClient()

	return useMutation<unknown, Error, { ids: string[] }>({
		mutationKey: ['like'],
		async mutationFn({ ids }): Promise<void> {
			console.log('call mutate')
			await spotifyClient.saveTracksForCurrentUser({ ids })
			console.log('end mutate')

		}
	})
}
