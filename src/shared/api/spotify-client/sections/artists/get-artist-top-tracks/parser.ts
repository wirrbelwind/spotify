import { z } from 'zod';
import { trackSchema } from '../../../schemas/track';
import { albumSchema } from '../../../schemas/album';
import { simplifiedArtistSchema } from '../../../schemas/simplified-artist';

export const getParser = () => {
  const album = albumSchema.omit({
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
    )

  const track = trackSchema.merge(z.object({
    album,
    artists: simplifiedArtistSchema.array()
  }),
  return z.object({
    tracks: track.array()
  })
}
