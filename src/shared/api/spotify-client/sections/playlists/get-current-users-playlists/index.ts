import { fetchCurrentUsersPlaylists } from "./http-request";
import { queryOptions } from "./query";

export const getCurrentUsersPlaylists = {
    fetch: fetchCurrentUsersPlaylists,
    queryOptions: queryOptions
}
