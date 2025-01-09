'use server'

import { $axios } from "@/utils/$axios"

export const checkLikedTracks = async (idList: string[]): Promise<boolean[]> => {
	const response = await $axios.get('https://api.spotify.com/v1/me/tracks/contains', {
		params: {
			ids: idList.join(',')
		}
	})

	return response.data
}