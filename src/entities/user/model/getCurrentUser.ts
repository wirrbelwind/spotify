'use server'
import 'server-only'

import { User } from "@/app/types"
import { refreshTokens } from "./refreshTokens"
import { spotifyApi } from "../../../utils/spotifyApi"
import { authService } from "./authService"

export const getCurrentUser = async (): Promise<User> => {
	const auth = await authService()

	if (!auth.tokens.isValidTokenData) {
		throw new Error('tokens are not in cookie')
	}

	const now = Date.now()

	if (now >= auth.tokens.accessTokenExpiresAt) {
		const newTokens = await refreshTokens()

	}

	//request user profile
	const userResponse = await spotifyApi.get<User>('https://api.spotify.com/v1/me')

	return userResponse.data
}
