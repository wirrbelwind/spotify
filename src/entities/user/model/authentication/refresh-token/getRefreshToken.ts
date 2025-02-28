'use server'

import { COOKIE_KEYS } from "@/entities/user/config"
import { cookies } from "next/headers"

export const getRefreshToken = async () => {
    const cookie = await cookies()

    return cookie.get(COOKIE_KEYS.REFRESH_TOKEN)?.value ?? null
}
