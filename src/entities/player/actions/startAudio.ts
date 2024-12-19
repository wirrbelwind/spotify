'use server'

import { $axios } from "@/utils/$axios"

export const startAudio = async (sourceUri: string, deviceId: string) => {
	try {
		await $axios.put(`https://api.spotify.com/v1/me/player/play`, {
			context_uri: sourceUri
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