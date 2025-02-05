import { z } from "zod"
import { albumSchema } from "../../../schemas/album"
import { simplifiedArtistSchema } from "../../../schemas/simplified-artist"
import { trackSchema } from "../../../schemas/track"
import { recommendationsSchema } from "../../../schemas/recommendations"

export const getParser = () => {
    const album = albumSchema
        .omit({
            copyrights: true,
            external_ids: true,
            genres: true,
            label: true,
            popularity: true
        })
        .merge(z.object({
            artists: simplifiedArtistSchema.array()
        }))

    const track = trackSchema.merge(z.object({
        album,
        artists: simplifiedArtistSchema,

    }))

    return recommendationsSchema.merge(z.object({
        tracks: track.array()
    }))
}

