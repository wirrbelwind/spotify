import {
  useQuery,
  queryOptions as queryOptionsLib,
  DefinedInitialDataOptions,
} from '@tanstack/react-query'
import { fetchCurrentUserTopArtists } from './http-request'

export const queryOptions = (
  {
    quantity,
    override,
  }: {
    override?: () => DefinedInitialDataOptions
    quantity: number
  } = { quantity: 5 },
) => {
  return queryOptionsLib({
    queryKey: ['current-user', 'top', 'artists', 'get'],
    queryFn: () => fetchCurrentUserTopArtists({ quantity: quantity }),
    ...override,
  })
}

// export const useCurrentUserTopTracks = () => {
//     const DEFAULT_QUANTITY = 5

//     return useQuery(queryOptions({quantity: DEFAULT_QUANTITY}))
// }
