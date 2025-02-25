import { fetGetArtist } from "./http-request";
import { queryOptions } from "./query";

export const getArtist = {
    fetch: fetGetArtist,
    queryOptions: queryOptions
}
