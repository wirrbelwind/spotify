'use server'
import { spotifyAxios } from "../../axios-instance"
import { DATA_API_URL } from "../../constants"
import { getParser } from "./parser"

type SearchType = "album" | "artist" | "playlist" | "track" | "show" | "episode" | "audiobook"

interface FetchUsersSavedTracksArgs<T> {
    query: string
    types: T[]
    market?: string
    limit?: number
    offset?: number
}

export const fetchSearch = async <T extends SearchType>({
    query,
    types,
    market,
    limit,
    offset
}: FetchUsersSavedTracksArgs<T>) => {
    
    const url = '/search'
    
    const response = await spotifyAxios.get(url, {
        params: {
            q: query,
            type: types,
            market,
            limit,
            offset,
            include_external: "audio",
        },
        baseURL: DATA_API_URL,
    })

    const json = response.data


    const obj: Record<T, boolean> = {
    }
    
    types.forEach(value => {
        obj[value] = true
    })

    return obj
}