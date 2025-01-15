
import axios, { AxiosError } from "axios";
import { refreshTokens } from '@/entities/user/model/refreshTokens';
import { authService } from '@/entities/user';
import { AUTH_API_URL } from './constants';

export const spotifyAxios = axios.create()

spotifyAxios.interceptors.request.use(async config => {
	const isAuthRequest = config.baseURL === AUTH_API_URL

	if (isAuthRequest) {
		return config
	}

	const auth = await authService()

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

spotifyAxios.interceptors.response.use(
	response => {
		return response
	},
	async (responseError: AxiosError) => {
		try {
			if (responseError.status === 401) {
				await refreshTokens()
				return spotifyAxios(responseError.request)
			}

			return responseError
		}
		catch {
			return responseError
		}
	}
)