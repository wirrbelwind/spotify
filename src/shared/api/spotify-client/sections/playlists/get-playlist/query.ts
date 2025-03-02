import { queryOptions as queryOptionsLib, DefinedInitialDataOptions } from '@tanstack/react-query'
import { fetchPlaylist } from './http-request'

export const queryOptions = (args: { id: string; override?: () => DefinedInitialDataOptions }) => {
  return queryOptionsLib({
    queryKey: ['playlist', 'get', args.id],
    queryFn: () => fetchPlaylist({ id: args.id }),
    ...args.override,
  })
}
