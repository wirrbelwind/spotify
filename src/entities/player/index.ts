'use server'

import { COOKIE_KEYS } from "@/constants"
import { $axios } from "@/utils/$axios"
import { cookies } from "next/headers"
import { spotifyApi } from "react-spotify-web-playback"

export const play = async (formData: FormData) => {
	const cookie = await cookies()
	const accessToken = cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value

	// const devices = (await spotifyApi.getDevices(accessToken)).devices
	// console.log(devices)
	const deviceId = formData.get('device-id')
	// const deviceId = devices.fin
	const uri = formData.get('uri')


	console.log('----------------')
	console.log(uri, deviceId)
	console.log('----------------')

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
		// console.log(error.data.error)
	}
}


export const pause = async (formData: FormData) => {
	const deviceId = formData.get('device-id')

	await $axios.put(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
	})
}
