import 'server-only'

import axios from "axios";
import { cookies } from "next/headers";
import UserEntity from "@/entities/user";
import { refreshTokens } from "@/utils/refreshTokens";

export const spotifyApi = axios.create()

spotifyApi.interceptors.request.use(async config => {
	const isAuthRequest = config.url?.startsWith('https://accounts.spotify.com')

	if (isAuthRequest) {
		return config
	}

	const auth = await UserEntity.authService()

	if (!auth.tokens.isValidTokenData) {
		throw new Error(`no tokens | request ${auth.tokens.accessToken} ${auth.tokens.refreshToken} ${auth.tokens.accessTokenExpiresAt}`)
	}

	const now = Date.now()

	if (auth.tokens.accessTokenExpiresAt <= now) {
		const tokens = await refreshTokens(auth.tokens.refreshToken)

		if (tokens.error) {
			throw new Error('cant refresh tokens')
		}
	}

	config.headers.Authorization = `Bearer ${auth.tokens.accessToken}`
	
	return config
})
