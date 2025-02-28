'use server'

import { COOKIE_KEYS } from "../../../config"
import { cookies } from "next/headers"

export const setAttemptedPage = async (value: string) => {
    const cookie = await cookies()

    return cookie.set(COOKIE_KEYS.TARGET_PAGE_AFTER_LOGIN, value)
}
