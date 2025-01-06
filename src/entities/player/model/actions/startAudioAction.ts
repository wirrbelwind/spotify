'use server'

import { $axios } from "@/utils/$axios"
import { cookies } from "next/headers"
import { COOKIE_KEYS } from "../../constants"

export const startAudioAction = async (contextUri?: string, audioUris?: string[], offset?: string) => {
	try {
		const cookie = await cookies()

		const deviceId = cookie.get(COOKIE_KEYS.DEVICE_ID)?.value
		await $axios.put(`https://api.spotify.com/v1/me/player/play`, {
			context_uri: contextUri,
			uris: audioUris ?? null,
			offset: offset ? { "uri": offset } : null
		}, {
			params: {
				device_id: deviceId
			}
		})

	}
	catch (error) {
		console.log('error', error.message, error.name, error.response.data)
	}
}