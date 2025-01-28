'use server'

import { spotifyClient } from '@/shared/api/spotify-client'

/**
 * @param quantity min = 1, max = 50
 */
export const getUserTopTracks = async (quantity: number) => {
	if (quantity < 1 || quantity > 50) {
		throw new Error('Exceeded limit. Quantity must be in range of 1-50')
	}

	const response = await spotifyClient.getCurrentUserTopTracks({ quantity })

	return response
}