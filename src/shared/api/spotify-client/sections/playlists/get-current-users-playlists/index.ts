import { fetchCurrentUsersPlaylists } from "./http-request";
import { queryOptions } from "./hook";

export const getCurrentUsersPlaylists = {
    fetch: fetchCurrentUsersPlaylists,
    queryOptions: queryOptions
}
