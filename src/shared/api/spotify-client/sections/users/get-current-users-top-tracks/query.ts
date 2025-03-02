import { queryOptions as queryOptionsLib, DefinedInitialDataOptions } from '@tanstack/react-query'
import { fetchCurrentUserTopTracks } from './http-request'

export const queryOptions = ({
  quantity,
  override,
}: {
  override?: () => DefinedInitialDataOptions
  quantity: number
}) => {
  return queryOptionsLib({
    queryKey: ['current-user', 'top', 'tracks', 'get'],
    queryFn: () => fetchCurrentUserTopTracks({ limit: quantity }),
    ...override,
  })
}

// export const useCurrentUserTopTracks = () => {
//     const DEFAULT_QUANTITY = 5

//     return useQuery(queryOptions({quantity: DEFAULT_QUANTITY}))
// }
