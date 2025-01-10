'use server'
import { authService } from "./authService"
import { spotifyClient } from "@/shared/api/spotify-client"

export const refreshTokens = async () => {
	const auth = await authService()

	if (!auth.tokens.refreshToken) {
		throw new Error('cookies has no refresh token data')
	}

	const refreshTokenResponse = await spotifyClient.auth.refreshTokens({
		refreshToken: auth.tokens.refreshToken
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
