'use server'
import { spotifyApi } from "@/shared/api"
import { authService } from "./authService"

export const refreshTokens = async () => {
	const auth = await authService()

	const refreshTokenResponse = await spotifyApi.post('https://accounts.spotify.com/api/token', {
		grant_type: 'refresh_token',
		refresh_token: auth.tokens.refreshToken,
		client_id: process.env.SPOTIFY_CLIENT_ID
	}, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
		},
	})

	if (refreshTokenResponse.status >= 400) {
		throw new Error('refresh token error', {
			cause: refreshTokenResponse.data
		})
	}

	const tokens = refreshTokenResponse.data as {
		access_token: string
		token_type: string
		expires_in: number
		refresh_token: string
		scope: string
	}

	const accessTokenExpiresAt = Date.now() + tokens.expires_in

	auth.tokens.accessToken = tokens.access_token
	auth.tokens.accessTokenExpiresAt = accessTokenExpiresAt
	auth.tokens.refreshToken = tokens.refresh_token

	return tokens
}