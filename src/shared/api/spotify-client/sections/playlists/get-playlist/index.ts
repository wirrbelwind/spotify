import { fetchPlaylist } from "./http-request";
import { queryOptions } from "./hook";

export const getPlaylist = {
    fetch: fetchPlaylist,
    queryOptions: queryOptions
}
