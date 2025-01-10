'use server'
import { spotifyApi } from "@/shared/api"
import { cookies } from "next/headers"
import { COOKIE_KEYS } from "../constants"
import { spotifyClient } from "@/shared/api/spotify-client"

export const shuffle = async (state: boolean) => {
	const cookie = await cookies()

	const deviceId = cookie.get(COOKIE_KEYS.DEVICE_ID)?.value

	if (!deviceId) {
		throw new Error('Cookie has no device id. Use server action rememberDevice')
	}

	await spotifyClient.player.shuffle({ state, deviceId })
}
