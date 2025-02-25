import { fetchUsersSavedTracks } from "./http-request";
import { queryOptions } from "./query";

export const checkUsersSavedTracks = {
    fetch: fetchUsersSavedTracks,
    queryOptions: queryOptions
}
