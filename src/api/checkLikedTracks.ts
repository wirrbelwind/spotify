'use server'

import { spotifyApi } from "@/shared/api"

export const checkLikedTracks = async (idList: string[]): Promise<boolean[]> => {
	const response = await spotifyApi.get('https://api.spotify.com/v1/me/tracks/contains', {
		params: {
			ids: idList.join(',')
		}
	})

	return response.data
}