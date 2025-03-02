'use server'

import { cookies } from 'next/headers'
import { COOKIE_KEYS } from '../../../config'

export async function getAuthenticationState() {
  const cookie = await cookies()

  return cookie.get(COOKIE_KEYS.STATE)?.value ?? null
}
