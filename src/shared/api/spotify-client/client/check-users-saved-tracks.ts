import { z } from "zod"
import { spotifyAxios } from "../axios-instance"
import { DATA_API_URL } from "../constants"

const getParser = () => z.boolean().array()

interface CheckUsersSavedTracksArgs {
	idList: string[]
}

export const checkUsersSavedTracks = async (args: CheckUsersSavedTracksArgs) => {
	const url = '/me/tracks/contains'
	
	const response = await spotifyAxios.get(url, {
		params: {
			ids: args.idList.join(',')
		},
		baseURL: DATA_API_URL,
	})

		const json = response.data

		const likes = getParser().parse(json)
		return likes
}