import axios from "axios";
import { cookies } from "next/headers";
import { refreshTokens } from "./refreshTokens";
import { COOKIE_KEYS } from "@/constants";

export const $axios = axios.create()

$axios.interceptors.request.use(async config => {
	const isAuthRequest = config.url?.startsWith('https://accounts.spotify.com')

	if (isAuthRequest) {
		return config
	}

	const cookie = await cookies()

	let accessToken = cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value
	let refreshToken = cookie.get(COOKIE_KEYS.REFRESH_TOKEN)?.value

	let accessTokenExpiresAt = Number(cookie.get(COOKIE_KEYS.ACCESS_TOKEN_EXPIRES_AT)?.value)

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

	config.headers.Authorization = `Bearer ${cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value}`
	
	return config
})
