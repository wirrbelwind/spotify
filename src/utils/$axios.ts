import axios from "axios";
import { cookies } from "next/headers";
import { refreshTokens } from "./refreshTokens";

export const $axios = axios.create()

$axios.interceptors.request.use(async config => {
	const isRefreshTokenRequest = config?.data?.grant_type === 'refresh_token'

	if (isRefreshTokenRequest) {
		return config
	}

	const cookie = await cookies()

	let accessToken = cookie.get('spotify-api:access-token')?.value
	let refreshToken = cookie.get('spotify-api:refresh-token')?.value

	let accessTokenExpiresAt = Number(cookie.get('spotify-api:access-token-expires-at')?.value)

	if (!accessToken || !refreshToken || !accessTokenExpiresAt || isNaN(accessTokenExpiresAt)) {
		throw new Error('no tokens')
	}

	const now = Date.now()

	if (accessTokenExpiresAt <= now) {
		const tokens = await refreshTokens(refreshToken)

		if (tokens.error) {
			throw new Error('cant refresh tokens')
		}
	}

	return config
})

$axios.interceptors.response.use(async response => {
	if (response.status === 200) {
		return response
	}

	const request = response.request

	const cookie = await cookies()

	let accessToken = cookie.get('spotify-api:access-token')?.value
	let refreshToken = cookie.get('spotify-api:refresh-token')?.value

	let accessTokenExpiresAt = Number(cookie.get('spotify-api:access-token-expires-at')?.value)

	if (!accessToken || !refreshToken || !accessTokenExpiresAt || isNaN(accessTokenExpiresAt)) {
		throw new Error('no tokens')
	}

	const now = Date.now()

	if (accessTokenExpiresAt <= now) {
		const tokens = await refreshTokens(refreshToken)

		if (tokens.error) {
			throw new Error('cant refresh tokens')
		}
	}

	return response
})