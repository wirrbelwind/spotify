import { fetchNewReleases } from "./http-request";
import { queryOptions } from "./query-options";

export const getNewReleases = {
    fetch: fetchNewReleases,
    queryOptions
}
