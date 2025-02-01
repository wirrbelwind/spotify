import { spotifyClient } from "@/shared/api/spotify-client"
import { queryOptions } from "@tanstack/react-query"

export const getPlaylistOptions = (id: string) => {
	return queryOptions({
		queryKey: ['playlist', id],
		queryFn: async () => {
			const response = await spotifyClient.getPlaylist({ id })
			return response
		},
		// TODO: this doesn't work. Each refreshing of page shows spinner for few seconds
		staleTime: 1000 * 60 * 60
	})
}
