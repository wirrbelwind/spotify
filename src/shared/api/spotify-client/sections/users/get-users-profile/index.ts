import { fetchUserProfile } from "./http-request";
import { queryOptions } from "./hook";

export const getUsersProfile = {
    fetch: fetchUserProfile,
    queryOptions: queryOptions
}
