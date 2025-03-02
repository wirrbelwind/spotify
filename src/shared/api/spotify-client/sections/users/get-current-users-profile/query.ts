import {
  useQuery,
  queryOptions as queryOptionsLib,
  DefinedInitialDataOptions,
} from '@tanstack/react-query'
import { fetchCurrentUserProfile } from './http-request'

export const queryOptions = (args?: { override?: () => DefinedInitialDataOptions }) => {
  return queryOptionsLib({
    queryKey: ['current-user', 'get'],
    queryFn: fetchCurrentUserProfile,
    ...args?.override,
  })
}

export const useCurrentUserProfile = () => {
  return useQuery(queryOptions())
}
