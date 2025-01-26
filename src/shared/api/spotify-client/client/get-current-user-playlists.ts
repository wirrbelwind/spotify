import { z } from "zod"
import { spotifyAxios } from "../axios-instance"
import { DATA_API_URL } from "../constants"
import { currentUserSchema } from "../schemas/current-user"
import { anotherUserSchema } from "../schemas/another-user"
import { simplifiedPlaylistSchema } from "../schemas/simplified-playlist"
import { pageWith } from "../schemas/page"

const getParser = () => {
	const playlist = simplifiedPlaylistSchema.merge(z.object({
		tracks: z.object({
			href: z.string().url(),
			total: z.number().int()
		}),
		owner: anotherUserSchema.omit({
			followers: true,
			images: true
		})
	}
	))

	return pageWith(playlist)
}

export const getCurrentUserPlaylists = async () => {
	// define request url
	const url = '/me/playlists'

	const response = await spotifyAxios.get(url, {
		baseURL: DATA_API_URL,
	})

	const json = response.data
	const user = getParser().parse(json)

	return user
}
