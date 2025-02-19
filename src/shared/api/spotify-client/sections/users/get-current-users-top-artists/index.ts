import { fetchCurrentUserTopArtists } from "./http-request";
import { queryOptions } from "./hook";

export const getCurrentUsersTopArtists = {
    fetch: fetchCurrentUserTopArtists,
    queryOptions: queryOptions
}
