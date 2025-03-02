'use server'
import { cookies } from 'next/headers'
import { COOKIE_KEYS } from '../constants'
import { spotifyApi } from '@/shared/api/spotify-client'

export async function shuffle(state: boolean) {
  const cookie = await cookies()

  const deviceId = cookie.get(COOKIE_KEYS.DEVICE_ID)?.value

  if (!deviceId) {
    throw new Error('Cookie has no device id. Use server action rememberDevice')
  }

  await spotifyApi.player.shuffle.fetch({ state, deviceId })
}
