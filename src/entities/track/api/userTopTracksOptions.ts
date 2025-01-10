import { queryOptions } from "@tanstack/react-query"
import { getUserTopTracks } from "../entities/track/api/getUserTopTracks"

export const userTopTracksOptions = (quantity: number) => {
  return queryOptions({
    queryKey: ['me', 'top', 'tracks', quantity],
    queryFn: () => getUserTopTracks(quantity),
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
  })
}
