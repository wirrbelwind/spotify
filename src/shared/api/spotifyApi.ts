import 'server-only'

import axios, { AxiosError } from "axios";
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

	if (auth.tokens.accessTokenExpiresAt! <= now) {
		const tokens = await refreshTokens()
	}

	config.headers.Authorization = `Bearer ${auth.tokens.accessToken}`

	return config
})

spotifyApi.interceptors.response.use(
	response => {
		return response
	},
	async (responseError: AxiosError) => {
		try {
			if (responseError.status === 401) {
				await refreshTokens()
				return spotifyApi(responseError.request)
			}

			return responseError
		}
		catch {
			return responseError
		}
	}
)