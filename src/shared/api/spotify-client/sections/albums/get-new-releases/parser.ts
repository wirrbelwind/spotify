import { z } from 'zod'
import { albumSchema } from '../../../schemas/album'
import { pageWith } from '../../../schemas/page'
import { simplifiedArtistSchema } from '../../../schemas/simplified-artist'

export const getParser = () => {
  const album = albumSchema
    .omit({
      copyrights: true,
      external_ids: true,
      genres: true,
      label: true,
      popularity: true
    })
    .merge(
      z.object({
      artists: simplifiedArtistSchema.array(),
      }),
  return z.object({
    albums: pageWith(album)
  })
}
