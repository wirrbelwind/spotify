'use server'

import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"

interface ShuffleArgs {
	state: boolean
	deviceId: string
}

export async function fetchShuffle ({
	deviceId,
	state
}: ShuffleArgs) {
	await spotifyAxios.put(
		'/me/player/shuffle',
		{},
		{
			params: {
				state,
				device_id: deviceId
			},
			baseURL: DATA_API_URL,
		})
}
