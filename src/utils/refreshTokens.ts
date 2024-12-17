import { cookies } from "next/headers"
import { $axios } from "./$axios"
import { COOKIE_KEYS } from "@/constants"

export const refreshTokens = async (refreshToken: string) => {
	const cookie = await cookies()

	const refreshTokenResponse = await $axios.post('https://accounts.spotify.com/api/token', {
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
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

	cookie.set(COOKIE_KEYS.ACCESS_TOKEN, tokens.access_token)
	cookie.set(COOKIE_KEYS.ACCESS_TOKEN_EXPIRES_AT, accessTokenExpiresAt.toString())
	cookie.set(COOKIE_KEYS.REFRESH_TOKEN, tokens.refresh_token)

	return tokens
}