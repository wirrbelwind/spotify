import { 
    queryOptions as queryOptionsLib,
    DefinedInitialDataOptions
 } from "@tanstack/react-query"
import { fetchRecommendations } from "./http-request"

export const queryOptions = (args: {
    override?: () => DefinedInitialDataOptions
    seedArtists?: string[]
    seedGenres?: string[]
    seedTracks?: string[]
}) => {
    return queryOptionsLib({
        queryKey: ['recommendations', 'get', args.seedArtists, args.seedGenres, args.seedTracks],
        queryFn: () => fetchRecommendations({
            seedArtists: args.seedArtists,
            seedGenres: args.seedGenres,
            seedTracks: args.seedTracks
        }),
        ...args.override
    })
}
