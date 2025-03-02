'use server'
import { AxiosError } from 'axios'
import { spotifyAxios } from '../../axios-instance'
import { DATA_API_URL } from '../../constants'
import { getParser } from './parser'
import { SearchType, SearchTypeApi } from './types'
import { allSearchTypesList } from './constants'

interface FetchSearchArgs {
  query: string
  types: SearchTypeApi[]
  market?: string
  limit?: number
  offset?: number
}

export async function fetchSearch({ query, types, market, limit, offset }: FetchSearchArgs) {
  const url = '/search'
  const response = await spotifyAxios.get(url, {
    params: {
      q: query,
      type: types.join(','),
      market,
      limit,
      offset,
      include_external: 'audio',
    },
    baseURL: DATA_API_URL,
  })

  const json = response.data
  return getParser().parse(json)
}
