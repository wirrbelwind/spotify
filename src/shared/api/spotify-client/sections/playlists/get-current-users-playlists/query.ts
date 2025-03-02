import { queryOptions as queryOptionsLib, DefinedInitialDataOptions } from '@tanstack/react-query'
import { fetchCurrentUsersPlaylists } from './http-request'

export const queryOptions = (args: {
  override?: () => DefinedInitialDataOptions
  idList: string[]
}) => {
  return queryOptionsLib({
    queryKey: ['current-user-playlists', 'get'],
    queryFn: fetchCurrentUsersPlaylists,
    ...args.override,
  })
}
