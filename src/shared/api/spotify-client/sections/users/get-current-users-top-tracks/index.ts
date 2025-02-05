import { fetchCurrentUserTopTracks } from "./http-request";
import { queryOptions, useCurrentUserTopTracks } from "./hook";

export const getCurrentUsersTopTracks = {
    fetch: fetchCurrentUserTopTracks,
    useQuery: useCurrentUserTopTracks,
    queryOptions: queryOptions
}
