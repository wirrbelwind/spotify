import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"

export interface FetchUsersPlaylistsArgs {
	userId: string
	limit?: number
	offset?: number
}

export const fetchUsersPlaylists = async ({
	userId,
	limit,
	offset
}: FetchUsersPlaylistsArgs) => {
	const url = `/users/${userId}/playlists`

	const response = await spotifyAxios.get(url, {
		baseURL: DATA_API_URL,
		params: {
			limit,
			offset
		}
	})

	const json = response.data
	const user = getParser().parse(json)

	return user
}
