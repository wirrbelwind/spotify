'use server'

import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"

interface GetCurrentUserTopTracks {
    quantity: number
}

export const fetchCurrentUserTopTracks = async ({quantity}: GetCurrentUserTopTracks) => {
    const url = '/me/top/tracks'

    const response = await spotifyAxios.get(url, {
        baseURL: DATA_API_URL,
        params: {
            limit: quantity
        },
    })

    const json = response.data
    const userTopTracks = getParser().parse(json)

    return userTopTracks
}
