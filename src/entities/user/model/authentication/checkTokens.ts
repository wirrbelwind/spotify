'use server'

import { getAccessToken } from "./access-token/getAccessToken"
import { getAccessTokenExpiration } from "./access-token/getAccessTokenExpiration"
import { getRefreshToken } from "./refresh-token/getRefreshToken"

export async function checkTokens () {
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