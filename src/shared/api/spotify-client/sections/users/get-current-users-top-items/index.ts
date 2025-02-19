import { fetchCurrentUsersTopItems } from "./http-request";
import { queryOptions } from "./hook";

export const getCurrentUsersTopItems = {
    fetch: fetchCurrentUsersTopItems,
    queryOptions: queryOptions
}
