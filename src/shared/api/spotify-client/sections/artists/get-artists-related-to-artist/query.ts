import { 
    queryOptions as queryOptionsLib,
 } from "@tanstack/react-query"
import { fetchArtistsRelatedToArtist,GetArtistsRelatedToArtistArgs } from "./http-request"

export const queryOptions = (args: GetArtistsRelatedToArtistArgs) => {
    return queryOptionsLib({
        queryKey: ['related-artist', args.artistId, 'get'],
        queryFn: () => fetchArtistsRelatedToArtist(args),
    })
}
