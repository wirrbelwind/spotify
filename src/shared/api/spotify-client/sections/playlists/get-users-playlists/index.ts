import { fetchUsersPlaylists } from "./http-request";
import { queryOptions } from "./query";

export const getUsersPlaylists = {
    fetch: fetchUsersPlaylists,
    queryOptions: queryOptions
}
