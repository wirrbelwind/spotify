import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"

interface GetPlaylistArgs {
	id: string
}

export const fetchPlaylist = async (args: GetPlaylistArgs) => {
	// define request url
	const url = `/playlists/${args.id}`

	const response = await spotifyAxios.get(url, {
		baseURL: DATA_API_URL,
		params: {
			playlist_id: args.id,
		},
	})

	const json = response.data
	const user = getParser().parse(json)

	return user
}
