import { fetchUsersPlaylists } from "./http-request";
import { queryOptions } from "./hook";

export const getUsersPlaylists = {
    fetch: fetchUsersPlaylists,
    queryOptions: queryOptions
}
