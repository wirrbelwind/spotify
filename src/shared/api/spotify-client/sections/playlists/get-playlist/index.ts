import { fetchPlaylist } from "./http-request";
import { queryOptions } from "./query";

export const getPlaylist = {
    fetch: fetchPlaylist,
    queryOptions: queryOptions
}
