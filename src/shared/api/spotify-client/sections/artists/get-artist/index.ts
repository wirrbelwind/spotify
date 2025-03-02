import { fetchGetArtist } from './http-request'
import { queryOptions } from './query'

export const getArtist = {
  fetch: fetchGetArtist,
  queryOptions: queryOptions,
}
