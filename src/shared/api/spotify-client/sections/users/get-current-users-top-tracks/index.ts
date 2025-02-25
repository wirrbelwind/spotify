import { fetchCurrentUserTopTracks } from "./http-request";
import { queryOptions } from "./query";

export const getCurrentUsersTopTracks = {
    fetch: fetchCurrentUserTopTracks,
    queryOptions: queryOptions
}
