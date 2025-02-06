import { fetchCurrentUserTopTracks } from "./http-request";
import { queryOptions } from "./hook";

export const getCurrentUsersTopTracks = {
    fetch: fetchCurrentUserTopTracks,
    queryOptions: queryOptions
}
