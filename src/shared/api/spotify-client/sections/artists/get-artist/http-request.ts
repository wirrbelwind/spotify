'use server'
import { spotifyAxios } from '../../../axios-instance'
import { DATA_API_URL } from '../../../constants'
import { getParser } from './parser'

export interface FetchGetArtistArgs {
  artistId: string
}

export async function fetchGetArtist({ artistId }: FetchGetArtistArgs) {
  const url = `/artists/${artistId}`

  const response = await spotifyAxios.get(url, {
    baseURL: DATA_API_URL,
  })

  const json = response.data
  const artist = getParser().parse(json)
  return artist
}
