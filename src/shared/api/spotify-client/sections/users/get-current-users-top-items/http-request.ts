'use server'

import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getArtistsParser, getTracksParser } from "./parser"

export interface FetchUsersTopItems {
    id: string
    "type": 'artists' | 'tracks'
    /**
     * @default 'medium_term'
     */
    timeRange?: 'long_term' | 'medium_term' | 'short_term'
    /**
     * @default 20
     * Range: 0 - 50
     */
    limit: number
    /**
     * @default 0
     */
    offset?: number
}

export const fetchCurrentUsersTopItems = async ({
    limit,
    type,
    offset,
    timeRange
}: FetchUsersTopItems) => {
    const url = `/me/top/${type}`

    const response = await spotifyAxios.get(url, {
        baseURL: DATA_API_URL,
        params: {
            type,
            time_range: timeRange,
            limit,
            offset
        }
    })

    const json = response.data

    switch (type) {
        case 'artists':
            return getArtistsParser().parse(json)
        case 'tracks':
            return getTracksParser().parse(json)
    }
}
