'use server'

import { spotifyClient } from "@/shared/api/spotify-client"

export const checkLikedTracks = async (idList: string[]): Promise<boolean[]> => {
	const response = await spotifyClient.checkLikes({ idList })

	return response
}
