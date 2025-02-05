import { fetchRecommendations } from "./http-request";
import { queryOptions } from "./hook";

export const getRecommendations = {
    fetch: fetchRecommendations,
    queryOptions: queryOptions
}
