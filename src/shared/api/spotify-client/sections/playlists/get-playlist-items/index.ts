import { fetchPlaylistItems } from "./http-request";
import { queryOptions } from "./hook";

export const getPlaylistItems = {
    fetch: fetchPlaylistItems,
    queryOptions: queryOptions
}
