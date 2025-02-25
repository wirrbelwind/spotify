import { z } from "zod";
import { artist } from "../../../schemas/artist";

export const getParser = () => {

    return z.object({
        artists: artist.array()
    })
    .transform(data => data.artists)
}
