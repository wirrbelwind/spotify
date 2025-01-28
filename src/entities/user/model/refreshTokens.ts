'use server'
import { authService } from "./authService"
import { spotifyClient } from "@/shared/api/spotify-client"

export const refreshTokens = async () => {
	const auth = await authService()

	if (!auth.tokens.refreshToken) {
		throw new Error('cookies has no refresh token data')
	}

	const tokens = await spotifyClient.refreshTokens({
		refreshToken: auth.tokens.refreshToken
	})

	const accessTokenExpiresAt = Date.now() + tokens.expires_in

	auth.tokens.accessToken = tokens.access_token
	auth.tokens.accessTokenExpiresAt = accessTokenExpiresAt
	if(tokens.refresh_token) {
		auth.tokens.refreshToken = tokens.refresh_token
	}

	return tokens
}
