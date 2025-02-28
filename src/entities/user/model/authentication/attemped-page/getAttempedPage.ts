'use server'

import { COOKIE_KEYS } from "../../../config"
import { cookies } from "next/headers"

export const getAttemptedPage = async () => {
    const cookie = await cookies()

    return cookie.get(COOKIE_KEYS.TARGET_PAGE_AFTER_LOGIN)?.value ?? null
}
