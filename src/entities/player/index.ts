'use server'

import { $axios } from "@/utils/$axios"
import UserEntity from "../user"

export const play = async (formData: FormData) => {
	const auth = await UserEntity.authService()

	const deviceId = formData.get('device-id')
	const uri = formData.get('uri')

	const body = {}

	if (uri) {
		body.context_uri = uri
	}

	console.log(body)
	try {
		await $axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, body)

	}
	catch (error) {
		console.log('error', error.message, error.name, error.response.data)
	}
}


export const pause = async (formData: FormData) => {
	const deviceId = formData.get('device-id')

	await $axios.put(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
	})
}
