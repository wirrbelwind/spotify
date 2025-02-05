import { fetchCurrentUserTopTracks } from "./http-request";
import { queryOptions, useCurrentUserTopTracks } from "./hook";

export const getCurrentUsersProfile = {
    fetch: fetchCurrentUserTopTracks,
    useQuery: useCurrentUserTopTracks,
    queryOptions: queryOptions
}
