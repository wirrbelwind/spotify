import { fetchCurrentUsersPlaylists } from "./http-request";
import { queryOptions } from "./hook";

export const getCurrentUsersPlaylist = {
    fetch: fetchCurrentUsersPlaylists,
    queryOptions: queryOptions
}
