import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"

export interface FetGetArtistTopTracksArgs {
    artistId: string
}

export const fetchGetArtistTopTracks = async ({artistId}: FetGetArtistTopTracksArgs) => {
    const url = `/artists/${artistId}/top-tracks`
    
    const response = await spotifyAxios.get(url, {
        baseURL: DATA_API_URL,
    })

    const json = response.data
    const topTracks = getParser().parse(json)
    return topTracks
}