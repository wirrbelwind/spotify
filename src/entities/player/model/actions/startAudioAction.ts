'use server'

import { spotifyApi } from "@/shared/api"
import { cookies } from "next/headers"
import { COOKIE_KEYS } from "../../constants"

interface StartAudioArgs {
	contextUri?: string
	audioUris?: string[]
	offset?: string
}

export const startAudioAction = async ({ audioUris, contextUri, offset }: StartAudioArgs) => {
	try {
		const cookie = await cookies()

		const deviceId = cookie.get(COOKIE_KEYS.DEVICE_ID)?.value
		await spotifyApi.put(`https://api.spotify.com/v1/me/player/play`, {
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