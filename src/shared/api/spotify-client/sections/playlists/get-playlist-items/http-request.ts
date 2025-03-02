'use server'

import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"

interface GetPlaylistItemsArgs {
	id: string
	fields?: string
}

export async function fetchPlaylistItems (args: GetPlaylistItemsArgs) {
	// define request url
	const url = `/playlists/${args.id}/tracks`

	const response = await spotifyAxios.get(url, {
		baseURL: DATA_API_URL,
		params: {
		},
	})

	const json = response.data
	const user = getParser().parse(json)

	return user
}

export const fetchNextPage = async (url: string) => {
	// define request url
	const response = await spotifyAxios.get(url)

	const json = response.data
	const data = getParser().parse(json)

	return data
}
