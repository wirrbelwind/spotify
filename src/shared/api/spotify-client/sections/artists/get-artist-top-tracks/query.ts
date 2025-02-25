import { 
    queryOptions as queryOptionsLib,
 } from "@tanstack/react-query"
import { fetGetArtistTopTracks,FetGetArtistTopTracksArgs } from "./http-request"

export const queryOptions = (args: FetGetArtistTopTracksArgs) => {
    return queryOptionsLib({
        queryKey: ['artist', 'top-tracks', args.artistId, 'get'],
        queryFn: () => fetGetArtistTopTracks(args),
    })
}
