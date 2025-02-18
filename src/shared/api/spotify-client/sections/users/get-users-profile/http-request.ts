'use server'

import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"
import { getParser } from "./parser"

interface FetchUserProfileArgs {
    userId: string
}

export const fetchUserProfile = async ({userId}: FetchUserProfileArgs) => {
    const url = `/users/${userId}`

    const response = await spotifyAxios.get(url, {
        baseURL: DATA_API_URL,
    })

    const json = response.data
    const user = getParser().parse(json)
    
    return user
}
