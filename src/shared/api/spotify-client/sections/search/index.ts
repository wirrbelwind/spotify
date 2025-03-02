import { fetchSearch } from './http-request'
import { queryOptions } from './query'
export type { SearchTypeApi, SearchType } from './types'

export const search = {
  fetch: fetchSearch,
  queryOptions: queryOptions,
}
