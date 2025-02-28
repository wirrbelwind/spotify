'use server'

import { getAccessToken } from "./access-token/getAccessToken"
import { getAccessTokenExpiration } from "./access-token/getAccessTokenExpiration"
import { getRefreshToken } from "./refresh-token/getRefreshToken"

export const checkTokens = async () => {
    if (await getAccessToken()
        &&
        await getAccessTokenExpiration()
        &&
        await getRefreshToken()
    ) {
        return true
    }
    return false
}