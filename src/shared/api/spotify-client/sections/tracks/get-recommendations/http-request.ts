'use server'

import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"

interface GetRecommendationsArgs {
    seedArtists?: string[]
    seedGenres?: string[]
    seedTracks?: string[]
}

export const fetchRecommendations = async ({ seedArtists, seedGenres, seedTracks }: GetRecommendationsArgs) => {
    const url = '/recommendations'

    const response = await spotifyAxios.get(url, {
        baseURL: DATA_API_URL,
        params: {
            seed_artists: seedArtists?.join(','),
            seed_genres: seedGenres?.join(','),
            seed_tracks: seedTracks?.join(',')
        }
    })

    const json = response.data

    return getParser().parse(json)
}
