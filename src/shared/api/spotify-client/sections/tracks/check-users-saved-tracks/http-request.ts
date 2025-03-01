'use server'
import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"

interface FetchUsersSavedTracksArgs {
    idList: string[]
}

export async function fetchUsersSavedTracks (args: FetchUsersSavedTracksArgs) {
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