import { 
    queryOptions as queryOptionsLib,
 } from "@tanstack/react-query"
import { FetchGetArtistArgs, fetGetArtist } from "./http-request"

export const queryOptions = (args: FetchGetArtistArgs) => {
    return queryOptionsLib({
        queryKey: ['artist', args.artistId, 'get'],
        queryFn: () => fetGetArtist(args),
    })
}
