import { z } from 'zod'
import { albumSchema } from '../../../schemas/album'
import { trackSchema } from '../../../schemas/track'
import { simplifiedArtistSchema } from '../../../schemas/simplified-artist'
import { pageWith } from '../../../schemas/page'

export const getParser = () => {
  const album = albumSchema.omit({
    copyrights: true,
    external_ids: true,
    genres: true,
    label: true,
    popularity: true,
  })

  const track = trackSchema.merge(
    z.object({
      album,
      artists: simplifiedArtistSchema.array(),
    }),
  )

  const pageWithTracks = pageWith(track)

  return pageWithTracks
}
