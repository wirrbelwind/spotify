import { queryOptions } from "@tanstack/react-query"
import { getUserTopTracks } from "./getUserTopTracks"

export const getUserTopTracksOptions = (quantity: number) => {
  return queryOptions({
    queryKey: ['me', 'top', 'tracks', quantity],
    queryFn: () => getUserTopTracks(quantity),
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
  })
}
