import { fetchArtistsRelatedToArtist } from "./http-request";
import { queryOptions } from "./query";

export const getArtistsRelatedToArtist = {
    fetch: fetchArtistsRelatedToArtist,
    queryOptions: queryOptions
}
