import { DefinedInitialDataOptions, queryOptions as queryOptionsLib } from '@tanstack/react-query'
import { fetchNewReleases } from './http-request'

export const queryOptions = (args?: {
  limit?: number
  offset?: number
  override?: () => Partial<DefinedInitialDataOptions>
}) => {
  return queryOptionsLib({
    queryKey: ['new-releases', args?.limit, args?.offset],
    queryFn: () =>
      fetchNewReleases({
        limit: args?.limit,
        offset: args?.offset,
      }),
    // ...args?.override?.()
  })
}
