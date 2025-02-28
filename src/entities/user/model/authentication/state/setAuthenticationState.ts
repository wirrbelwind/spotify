'use server'

import { cookies } from "next/headers"
import { COOKIE_KEYS } from "../../../config"

export const setAuthenticationState = async (value: string) => {
    const cookie = await cookies()

    cookie.set(COOKIE_KEYS.STATE,value)
}
