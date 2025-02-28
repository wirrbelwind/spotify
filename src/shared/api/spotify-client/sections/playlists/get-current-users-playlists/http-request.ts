import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"


export const fetchCurrentUsersPlaylists = async () => {
	const url = '/me/playlists'

	const response = await spotifyAxios.get(url, {
		baseURL: DATA_API_URL,
	})

	const json = response.data
	const user = getParser().parse(json)

	return user
}
