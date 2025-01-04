'use server'
import { $axios } from "@/utils/$axios"

export const shuffleAction = async (value: boolean, deviceId: string) => {
	await $axios.put('https://api.spotify.com/v1/me/player/shuffle',{},{
		params: {
			state: value,
			device_id: deviceId
		}
	})
}
