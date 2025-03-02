import { fetchPlaylistItems } from "./http-request";
import { queryOptions } from "./query";

export const getPlaylistItems = {
    fetch: fetchPlaylistItems,
    queryOptions: queryOptions
}
