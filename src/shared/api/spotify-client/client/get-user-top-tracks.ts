import { z } from "zod"
import { spotifyAxios } from "../axios-instance"
import { DATA_API_URL } from "../constants"
import { currentUserSchema } from "../schemas/current-user"
import { trackSchema } from "../schemas/track"
import { albumSchema } from "../schemas/album"
import { pageWith } from "../schemas/page"

const getParser = () => {
	const album = albumSchema.omit({
		copyrights: true,
		external_ids: true,
		genres: true,
		label: true,
		popularity: true,
	})

	const track = trackSchema.merge(z.object({
		album
	}))

	const pageWithTracks = pageWith(track)

	return pageWithTracks
}
// Or:
// const getParser = () => {
// 	// use some schema as a base
// 	currentUserSchema
// 	// omit some fields
// 	.omit({
// 		email: true,
// 		images: true
// 	})
// 	// add/override some fields
// 	.merge(z.object({
// 		additionalData: z.literal(true)
// 	}))
// }

export const getUserTopTracks = async () => {
	// define request url
	const url = '/me/top/tracks'

	const response = await spotifyAxios.get(url, {
		baseURL: DATA_API_URL,
	})

	const json = response.data
	const user = getParser().parse(json)

	return user
}
