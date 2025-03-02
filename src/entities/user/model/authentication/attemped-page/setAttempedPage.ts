'use server'

import { COOKIE_KEYS } from "../../../config"
import { cookies } from "next/headers"

export async function setAttemptedPage (value: string) {
    const cookie = await cookies()

    return cookie.set(COOKIE_KEYS.TARGET_PAGE_AFTER_LOGIN, value)
}
