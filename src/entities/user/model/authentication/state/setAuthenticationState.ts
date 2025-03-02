'use server'

import { cookies } from 'next/headers'
import { COOKIE_KEYS } from '../../../config'

export async function setAuthenticationState(value: string) {
  const cookie = await cookies()

  cookie.set(COOKIE_KEYS.STATE, value)
}
