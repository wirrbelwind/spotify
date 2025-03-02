'use server'
import { spotifyAxios } from '../../../axios-instance'
import { AUTH_API_URL } from '../../../constants'
import { getParser } from './parser'

interface FetchTokensByCodeArgs {
  code: string
  base64Credentials: string
}

export async function fetchTokensByCode({ code, base64Credentials }: FetchTokensByCodeArgs) {
  const url = '/api/token'

  const response = await spotifyAxios.post(url, {
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI
  },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${base64Credentials}`
    },
    baseURL: AUTH_API_URL
  },
  const json = response.data

  return getParser().parse(json)
}
