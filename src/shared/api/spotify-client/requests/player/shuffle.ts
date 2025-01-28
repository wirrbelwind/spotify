import { spotifyAxios } from "../../axios-instance"
import { DATA_API_URL } from "../../constants"

interface SguffleArgs {
	state: boolean
	deviceId: string
}

export const shuffle = async ({
	deviceId,
	state
}: SguffleArgs) => {
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
