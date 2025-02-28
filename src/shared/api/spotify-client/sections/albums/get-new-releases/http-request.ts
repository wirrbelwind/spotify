import { spotifyAxios } from "../../../axios-instance"
import { AUTH_API_URL, DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"

interface FetchNewReleases {
    limit?: number
    offset?: number
}

export const fetchNewReleases = async ({ limit, offset }: FetchNewReleases) => {
    const url = 'browse/new-releases'

    const response = await spotifyAxios.get(url, {
        baseURL: DATA_API_URL
    })

    const json = response.data
    console.log('datadata')
    console.log(json.albums.items[0])
    return getParser().parse(json)
}
