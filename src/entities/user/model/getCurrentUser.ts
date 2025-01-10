'use server'
import 'server-only'

import { refreshTokens } from "./refreshTokens"
import { authService } from "./authService"
import { spotifyApi } from '@/shared/api'
import { User } from '@/shared/api/spotify-types'
import { spotifyClient } from '@/shared/api/spotify-client'

export const getCurrentUser = async (): Promise<User> => {
	const auth = await authService()

	if (!auth.tokens.isValidTokenData) {
		throw new Error('tokens are not in cookie')
	}

	const now = Date.now()

	if (now >= auth.tokens.accessTokenExpiresAt!) {
		const newTokens = await refreshTokens()

	}

	//request user profile
	const userResponse = await spotifyClient.user()

	return userResponse.data
}
