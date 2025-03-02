'use server'

import { COOKIE_KEYS } from "@/entities/user/config"
import { cookies } from "next/headers"

export async function getAccessToken() {
    const cookie = await cookies()

    return cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null
}
