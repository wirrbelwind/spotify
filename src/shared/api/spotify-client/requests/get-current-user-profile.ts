import { spotifyAxios } from "../axios-instance"
import { DATA_API_URL } from "../constants"
import { currentUserSchema } from "../schemas/current-user"

const getParser = () => currentUserSchema

export const getCurrentUserProfile = async () => {
	const url = '/me'

	const response = await spotifyAxios.get(url, {
		baseURL: DATA_API_URL,
	})

	const json = response.data
	const user = getParser().parse(json)
	
	return user
}