'use server'
import { authenticationActions } from "./authentication"
import { authService } from "./authService"
import { spotifyApi } from "@/shared/api/spotify-client"

export const refreshTokens = async () => {
	const refreshToken = await authenticationActions.getRefreshToken()
	if (!refreshToken) {
		throw new Error('cookies has no refresh token data')
	}

	const tokensResponse = await spotifyApi.refreshTokens.fetch({
		refreshToken
	})

	const accessTokenExpiresAt = Date.now() + tokensResponse.expires_in

	authenticationActions.setAccessToken(tokensResponse.access_token)
	authenticationActions.setAccessTokenExpiration(accessTokenExpiresAt)

	return tokensResponse
}
