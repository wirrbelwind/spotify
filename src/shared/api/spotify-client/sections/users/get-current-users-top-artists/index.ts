import { fetchCurrentUserTopArtists } from './http-request'
import { queryOptions } from './query'

export const getCurrentUsersTopArtists = {
  fetch: fetchCurrentUserTopArtists,
  queryOptions: queryOptions,
}
