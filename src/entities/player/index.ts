'use server'

import { $axios } from "@/utils/$axios"

export const pause = async (formData: FormData) => {
	const deviceId = formData.get('device-id')

	await $axios.put(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
	})
}

export const play = async (formData: FormData) => {
	const deviceId = formData.get('device-id')
	
	try {
		await $axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
		})
	}
	catch(error) {
		// console.log(error.data.error)
	}
}
