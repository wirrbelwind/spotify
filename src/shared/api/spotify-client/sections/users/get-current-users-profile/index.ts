import { fetchCurrentUserProfile } from "./http-request";
import { queryOptions, useCurrentUserProfile } from "./hook";

export const getCurrentUsersProfile = {
    fetch: fetchCurrentUserProfile,
    useQuery: useCurrentUserProfile,
    queryOptions: queryOptions
}
