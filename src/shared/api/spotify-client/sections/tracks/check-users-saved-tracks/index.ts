import { fetchUsersSavedTracks } from "./http-request";
import { queryOptions } from "./hook";

export const checkUsersSavedTracks = {
    fetch: fetchUsersSavedTracks,
    queryOptions: queryOptions
}
