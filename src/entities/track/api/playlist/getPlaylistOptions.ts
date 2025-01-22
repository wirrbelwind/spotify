import { spotifyClient } from "@/shared/api/spotify-client"
import { queryOptions } from "@tanstack/react-query"

export const getPlaylistOptions = (id: string) => {
	return queryOptions({
		queryKey: ['playlist', id],
		queryFn: async () => {
			const response = await spotifyClient.playlist({ id })

		}
	})
}
