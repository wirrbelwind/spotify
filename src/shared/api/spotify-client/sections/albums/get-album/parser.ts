import { z } from "zod"
import { albumSchema } from "../../../schemas/album"
import { pageWith } from "../../../schemas/page"
import { simplifiedArtistSchema } from "../../../schemas/simplified-artist"
import { trackSchema } from "../../../schemas/track"
import { simplifiedTrackSchema } from "../../../schemas/simplified-track"

export const getParser = () => {
    const album = albumSchema
    .merge(z.object({
        artists: simplifiedArtistSchema.array(),
        tracks: pageWith(simplifiedTrackSchema)
    }))

    return album
}
