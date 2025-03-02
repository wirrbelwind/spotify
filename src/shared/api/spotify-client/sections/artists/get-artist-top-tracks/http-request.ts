'use server'
import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"

export interface FetGetArtistTopTracksArgs {
    artistId: string
}

export async function fetchGetArtistTopTracks ({artistId}: FetGetArtistTopTracksArgs) {
    const url = `/artists/${artistId}/top-tracks`
    
    const response = await spotifyAxios.get(url, {
        baseURL: DATA_API_URL,
    })

    const json = response.data
    const topTracks = getParser().parse(json)
    return topTracks
}