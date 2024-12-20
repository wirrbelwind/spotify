'use server'

import { $axios } from "@/utils/$axios"

export const startAudio = async (deviceId: string, contextUri?: string, audioUris?: string[], offset?: string) => {
	try {
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