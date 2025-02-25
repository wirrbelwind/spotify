import { fetchGetArtistTopTracks } from "./http-request";
import { queryOptions } from "./query";

export const getArtistTopTracks = {
    fetch: fetchGetArtistTopTracks,
    queryOptions: queryOptions
}
