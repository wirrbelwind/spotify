'use server'
import { $axios } from "@/utils/$axios"
import { cookies } from "next/headers"
import { COOKIE_KEYS } from "../../constants"

export const shuffleAction = async (value: boolean) => {
	const cookie = await cookies()

	const deviceId = cookie.get(COOKIE_KEYS.DEVICE_ID)?.value

	await $axios.put('https://api.spotify.com/v1/me/player/shuffle', {}, {
		params: {
			state: value,
			device_id: deviceId
		}
	})
}
