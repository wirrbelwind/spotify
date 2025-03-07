'use server'

import { cookies } from 'next/headers'
import { COOKIE_KEYS } from '../constants'
import { spotifyApi } from '@/shared/api/spotify-client'

interface StartAudioArgs {
  contextUri?: string
  audioUris?: string[]
  offset?: string | number
}

export async function startAudio({ audioUris, contextUri, offset }: StartAudioArgs) {
  const cookie = await cookies()

  const deviceId = cookie.get(COOKIE_KEYS.DEVICE_ID)?.value

  if (!deviceId) {
    throw new Error('Cookie has no device id. Use server action rememberDevice')
  }

  await spotifyApi.player.startPlayback.fetch({
    audioUris,
    contextUri,
    offset,
    deviceId,
  })
}
