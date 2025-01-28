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

interface RefreshTokensArgs {
	refreshToken: string
}

export const refreshTokens = async ({ refreshToken }: RefreshTokensArgs) => {
	const url = '/recommendations'

	const response = await spotifyAxios.post('/api/token', {
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
		client_id: process.env.SPOTIFY_CLIENT_ID
	}, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
		},
		baseURL: AUTH_API_URL
	})

	const json = response.data

	return getParser().parse(json)
}
