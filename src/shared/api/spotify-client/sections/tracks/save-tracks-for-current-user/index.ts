import { fetchSaveTracksForCurrentUser } from "./http-request";
import { mutationOptions } from "./hook";

export const getRecommendations = {
    fetch: fetchSaveTracksForCurrentUser,
    mutationOptions
}
