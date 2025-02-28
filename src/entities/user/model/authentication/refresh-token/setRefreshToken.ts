'use server'

import { COOKIE_KEYS } from "@/entities/user/config"
import { cookies } from "next/headers"

export const setRefreshToken = async (value: string) => {
    const cookie = await cookies()

    cookie.set(COOKIE_KEYS.REFRESH_TOKEN, value)
}
