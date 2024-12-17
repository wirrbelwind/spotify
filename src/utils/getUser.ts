import { User } from "@/app/types"
import { cookies } from "next/headers"
import { refreshTokens } from "./refreshTokens"
import { $axios } from "./$axios"
import { COOKIE_KEYS } from "@/constants"

export const getUser = async (): Promise<User> => {
	const cookie = await cookies()

	let accessToken = cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value
	let refreshToken = cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value

	let accessTokenExpiresAt = Number(cookie.get(COOKIE_KEYS.ACCESS_TOKEN_EXPIRES_AT)?.value)

	if (!accessToken || !refreshToken || !accessTokenExpiresAt || isNaN(accessTokenExpiresAt)) {
		throw new Error('tokens are not in cookie')
	}

	const now = Date.now()

	if (now >= accessTokenExpiresAt) {
		await refreshTokens(refreshToken)
	}

	//request user profile
	const userResponse = await $axios.get<User>('https://api.spotify.com/v1/me')

	return userResponse.data
}