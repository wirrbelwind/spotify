import { spotifyAxios } from "../../../axios-instance"
import { AUTH_API_URL, DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"

interface FetchAlbum {
    id: string
    market?: string
}

export const fetchAlbum = async ({ id,market }: FetchAlbum) => {
    const url = `albums/${id}`

    const response = await spotifyAxios.get(url, {
        baseURL: DATA_API_URL
    })

    const json = response.data
    return getParser().parse(json)
}
