import { User } from "@/app/types"
import { cookies } from "next/headers"
import { refreshTokens } from "./refreshTokens"
import { $axios } from "./$axios"

export const getUser = async (): Promise<User> => {
	const cookie = await cookies()

	let accessToken = cookie.get('spotify-api:access-token')?.value
	let refreshToken = cookie.get('spotify-api:refresh-token')?.value

	let accessTokenExpiresAt = Number(cookie.get('spotify-api:access-token-expires-at')?.value)

	if (!accessToken || !refreshToken || !accessTokenExpiresAt || isNaN(accessTokenExpiresAt)) {
		throw new Error('tokens are not in cookie')
	}

	const now = Date.now()

	if (now >= accessTokenExpiresAt) {
		await refreshTokens(refreshToken)
	}

	//request user profile
	const userResponse = await $axios.get<User>('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${cookie.get('spotify-api:access-token')?.value}`
		}
	})

	return userResponse.data
}