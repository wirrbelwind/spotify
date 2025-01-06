'use server'

import { $axios } from "@/utils/$axios"

export const getPlayerState = async () => {
	const response = await $axios.get('https://api.spotify.com/v1/me/player', {
		params: {
			market: 'ES'
		}
	})

	return response.data
}