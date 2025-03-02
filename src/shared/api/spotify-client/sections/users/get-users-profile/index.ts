import { fetchUserProfile } from './http-request'
import { queryOptions } from './query'

export const getUsersProfile = {
  fetch: fetchUserProfile,
  queryOptions: queryOptions,
}
