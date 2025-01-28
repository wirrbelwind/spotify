import { z } from "zod"
import { spotifyAxios } from "../axios-instance"
import { AUTH_API_URL, DATA_API_URL } from "../constants"
import { currentUserSchema } from "../schemas/current-user"
import { trackSchema } from "../schemas/track"
import { albumSchema } from "../schemas/album"
import { pageWith } from "../schemas/page"
import { playlistSchema } from "../schemas/playlist"
import { anotherUserSchema } from "../schemas/another-user"
import { playlistTrackSchema } from "../schemas/playlist-track"
import { simplifiedArtistSchema } from "../schemas/simplified-artist"
import { episodeSchema } from "../schemas/episode"
import { showSchema } from "../schemas/show"
import { recommendationsSchema } from "../schemas/recommendations"
import { tokensSchema } from "../schemas/tokens"

const getParser = () => {
	return tokensSchema	
}

interface GetTokensByCodeArgs {
	code: string
	base64Credentials: string
}

export const getTokensByCode = async ({ code, base64Credentials }: GetTokensByCodeArgs) => {
	const url = '/recommendations'

	const response = await spotifyAxios.post(url, {
		grant_type: 'authorization_code',
		code,
		redirect_uri: process.env.SPOTIFY_REDIRECT_URI
	}, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': `Basic ${base64Credentials}`
		},
		baseURL: AUTH_API_URL
	})

	const json = response.data

	return getParser().parse(json)
}
