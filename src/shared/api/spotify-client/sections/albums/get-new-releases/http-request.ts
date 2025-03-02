'use server'
import { spotifyAxios } from '../../../axios-instance'
import { DATA_API_URL } from '../../../constants'
import { getParser } from './parser'

interface FetchNewReleases {
  limit?: number
  offset?: number
}

export async function fetchNewReleases({ limit, offset }: FetchNewReleases) {
  const url = 'browse/new-releases'

  const response = await spotifyAxios.get(url, {
    baseURL: DATA_API_URL,
  })

  const json = response.data
  console.log('datadata')
  console.log(json.albums.items[0])
  return getParser().parse(json)
}
