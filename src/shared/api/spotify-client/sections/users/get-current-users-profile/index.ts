import { fetchCurrentUserProfile } from "./http-request";
import { queryOptions, useCurrentUserProfile } from "./query";

export const getCurrentUsersProfile = {
    fetch: fetchCurrentUserProfile,
    useQuery: useCurrentUserProfile,
    queryOptions: queryOptions
}
