'use server'
import { AxiosError } from "axios"
import { spotifyAxios } from "../../axios-instance"
import { DATA_API_URL } from "../../constants"
import { getParser } from "./parser"

export type SearchTypeApi = 'album' | 'artist' | 'audiobook' | 'episode' | 'playlist' | 'show' | 'track'

interface FetchUsersSavedTracksArgs {
    query: string
    types: SearchTypeApi[]
    market?: string
    limit?: number
    offset?: number
}

export const fetchSearch = async ({
    query,
    types,
    market,
    limit,
    offset
}: FetchUsersSavedTracksArgs) => {

    const url = '/search'
    const response = await spotifyAxios.get(url, {
        params: {
            q: query,
            type: types.join(','),
            market,
            limit,
            offset,
            include_external: "audio",
        },
        baseURL: DATA_API_URL,
    })

    const json = response.data
    return getParser().parse(json)
}
