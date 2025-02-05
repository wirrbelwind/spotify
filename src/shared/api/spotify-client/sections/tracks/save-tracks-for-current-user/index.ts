import { fetchSaveTracksForCurrentUser } from "./http-request";
import { mutationOptions } from "./hook";

export const saveTracksForCurrentUser = {
    fetch: fetchSaveTracksForCurrentUser,
    mutationOptions
}
