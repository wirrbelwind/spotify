'use server'
import { spotifyAxios } from '../../../axios-instance'
import { AUTH_API_URL } from '../../../constants'
import { getParser } from './parser'

interface RefreshTokensArgs {
  refreshToken: string
}

export async function fetchRefreshTokens({ refreshToken }: RefreshTokensArgs) {
  const url = '/api/token'

  const response = await spotifyAxios.post(
    url,
    {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
      },
      baseURL: AUTH_API_URL,
    },
  )

  const json = response.data
  return getParser().parse(json)
}
