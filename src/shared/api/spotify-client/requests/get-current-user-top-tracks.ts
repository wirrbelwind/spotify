import { z } from "zod"
import { spotifyAxios } from "../axios-instance"
import { DATA_API_URL } from "../constants"
import { currentUserSchema } from "../schemas/current-user"
import { trackSchema } from "../schemas/track"
import { albumSchema } from "../schemas/album"
import { pageWith } from "../schemas/page"
import { simplifiedArtistSchema } from "../schemas/simplified-artist"

const getParser = () => {
	const album = albumSchema.omit({
		copyrights: true,
		external_ids: true,
		genres: true,
		label: true,
		popularity: true,
	})

	const track = trackSchema.merge(z.object({
		album,
		artists: simplifiedArtistSchema.array(),
	}))

	const pageWithTracks = pageWith(track)

	return pageWithTracks
}

const parser = getParser()

export type CurrentUserTopTracks = z.output<typeof parser>

interface GetCurrentUserTopTracks {
	quantity: number
}

export const getCurrentUserTopTracks = async ({quantity}: GetCurrentUserTopTracks) => {
	// define request url
	const url = '/me/top/tracks'

	const response = await spotifyAxios.get(url, {
		baseURL: DATA_API_URL,
		params: {
			limit: quantity
		},
	})

	const json = response.data
	const userTopTracks = parser.parse(json)

	return userTopTracks
}
