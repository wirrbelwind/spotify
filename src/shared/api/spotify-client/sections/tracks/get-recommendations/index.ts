import { fetchRecommendations } from "./http-request";
import { queryOptions } from "./query";

export const getRecommendations = {
    fetch: fetchRecommendations,
    queryOptions: queryOptions
}
