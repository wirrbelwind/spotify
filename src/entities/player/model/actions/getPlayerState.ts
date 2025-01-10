'use server'

import { spotifyApi } from "@/shared/api"

export const getPlayerState = async () => {
	const response = await spotifyApi.get('https://api.spotify.com/v1/me/player', {
		params: {
			market: 'ES'
		}
	})

	return response.data
}