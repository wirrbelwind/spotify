'use server'

import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"

interface GetCurrentUserTopTracks {
    timeRange?: 'medium_term' | 'short_term' | 'long_term'
    limit?: number
    offset?: number
}

export const fetchCurrentUserTopTracks = async ({
    limit,
    offset,
    timeRange
}: GetCurrentUserTopTracks) => {
    const url = '/me/top/tracks'

    const response = await spotifyAxios.get(url, {
        baseURL: DATA_API_URL,
        params: {
            limit,
            offset,
            time_range: timeRange
        },
    })

    const json = response.data
    const userTopTracks = getParser().parse(json)

    return userTopTracks
}
