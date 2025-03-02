'use server'

import { COOKIE_KEYS } from "@/entities/user/config"
import { cookies } from "next/headers"

export async function getAccessTokenExpiration () {
    const cookie = await cookies()

    const expiration = cookie.get(COOKIE_KEYS.ACCESS_TOKEN_EXPIRES_AT)?.value

    if (expiration) {
        return Number(expiration)
    }
    else {
        return null
    }
}
