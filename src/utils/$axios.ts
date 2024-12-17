import axios from "axios";
import { cookies } from "next/headers";
import { refreshTokens } from "./refreshTokens";

export const $axios = axios.create()

$axios.interceptors.request.use(async config => {
	const isAuthRequest = config.url?.startsWith('https://accounts.spotify.com')

	if (isAuthRequest) {
		return config
	}

	const cookie = await cookies()

	let accessToken = cookie.get('spotify-api:access-token')?.value
	let refreshToken = cookie.get('spotify-api:refresh-token')?.value

	let accessTokenExpiresAt = Number(cookie.get('spotify-api:access-token-expires-at')?.value)

	if (!accessToken || !refreshToken || !accessTokenExpiresAt || isNaN(accessTokenExpiresAt)) {
		throw new Error(`no tokens | request ${accessToken} ${refreshToken} ${accessTokenExpiresAt}`)
	}

	const now = Date.now()

	if (accessTokenExpiresAt <= now) {
		const tokens = await refreshTokens(refreshToken)

		if (tokens.error) {
			throw new Error('cant refresh tokens')
		}
	}

	config.headers.Authorization = `Bearer ${cookie.get('spotify-api:access-token')?.value}`
	
	return config
})
