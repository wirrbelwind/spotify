import { fetchSearch } from "./http-request";
import { queryOptions } from "./hook";

export const checkUsersSavedTracks = {
    fetch: fetchSearch,
    queryOptions: queryOptions
}
