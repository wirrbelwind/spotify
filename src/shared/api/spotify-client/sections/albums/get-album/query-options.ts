import { queryOptions as queryOptionsLib, UseQueryOptions } from '@tanstack/react-query'
import { fetchAlbum } from './http-request'

export const queryOptions = ({
  id,
  market,
  override,
}: {
  id: string
  market?: string
  override?: Partial<UseQueryOptions>
}) => {
  const options = queryOptionsLib({
    queryKey: ['album', id],
    queryFn: () =>
      fetchAlbum({
        id,
        market,
      }),
  })

  return {
    ...options,
    ...override,
  } as typeof options
}
