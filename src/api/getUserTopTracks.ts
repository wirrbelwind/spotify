'use server'

import { PageObject, TrackObject } from "@/app/types"
import { $axios } from "@/utils/$axios"

/**
 * @param quantity min = 1, max = 50
 */
export const getUserTopTracks = async (quantity: number) => {
	if (quantity < 1 || quantity > 50) {
		throw new Error('Exceeded limit. Quantity must be in range of 1-50')
	}

	const response = await $axios.get<PageObject<TrackObject>>('https://api.spotify.com/v1/me/top/tracks', {
		params: {
			limit: quantity
		}
	})

	return response.data
}