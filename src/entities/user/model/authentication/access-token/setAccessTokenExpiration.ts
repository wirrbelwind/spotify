'use server'

import { COOKIE_KEYS } from '@/entities/user/config'
import { cookies } from 'next/headers'

export async function setAccessTokenExpiration(value: number | string) {
  const cookie = await cookies()

  cookie.set(COOKIE_KEYS.ACCESS_TOKEN_EXPIRES_AT, value.toString())
}
