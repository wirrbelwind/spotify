import { z } from "zod";
import { albumSchema } from "../../../schemas/album";
import { anotherUserSchema } from "../../../schemas/another-user";
import { artist } from "../../../schemas/artist";
import { simplifiedArtistSchema } from "../../../schemas/simplified-artist";
import { trackSchema } from "../../../schemas/track";

export const getArtistsParser = () => artist
export const getTracksParser = () => {
    const album = albumSchema.omit({
        copyrights: true,
            external_ids: true,
            genres: true,
            label: true,
            popularity: true
    })
    .merge(z.object({
        artists: simplifiedArtistSchema
    }))

    const track = trackSchema
    .merge(z.object({
        album,
        artists: simplifiedArtistSchema.array(),

    }))

    return track
}

