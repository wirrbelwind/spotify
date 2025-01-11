'use server'
import 'server-only'

import { refreshTokens } from "./refreshTokens"
import { authService } from "./authService"
import { spotifyApi } from '@/shared/api'
import { User } from '@/shared/api/spotify-types'
import { spotifyClient } from '@/shared/api/spotify-client'

export const getCurrentUser = async (): Promise<User | null> => {
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
		const userResponse = await spotifyClient.user()

		return userResponse.data
	} catch {
		return null
	}
}
