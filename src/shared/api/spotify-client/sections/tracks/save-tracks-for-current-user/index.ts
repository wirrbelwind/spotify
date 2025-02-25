import { fetchSaveTracksForCurrentUser } from "./http-request";
import { mutationOptions } from "./mutation";

export const saveTracksForCurrentUser = {
    fetch: fetchSaveTracksForCurrentUser,
    mutationOptions
}
