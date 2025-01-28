'use server'
import 'server-only'

import { refreshTokens } from "./refreshTokens"
import { authService } from "./authService"
import { spotifyClient } from '@/shared/api/spotify-client'

export const getCurrentUser = async () => {
	const auth = await authService()

	if (!auth.tokens.isValidTokenData) {
		return null
	}

	const isAccessTokenExpired = Date.now() >= auth.tokens.accessTokenExpiresAt!

	if (isAccessTokenExpired) {
		await refreshTokens()
	}

	//request user profile
	try {
		const userResponse = await spotifyClient.getCurrentUserProfile()

		return userResponse
	} catch {
		return null
	}
}
