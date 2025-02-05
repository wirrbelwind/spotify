import { fetchUsersSavedTracks } from "./http-request";
import { queryOptions } from "./hook";

export const getCurrentUsersProfile = {
    fetch: fetchUsersSavedTracks,
    queryOptions: queryOptions
}
