import { z } from 'zod'
import { albumSchema } from '../../../schemas/album'
import { anotherUserSchema } from '../../../schemas/another-user'
import { episodeSchema } from '../../../schemas/episode'
import { playlistTrackSchema } from '../../../schemas/playlist-track'
import { showSchema } from '../../../schemas/show'
import { simplifiedArtistSchema } from '../../../schemas/simplified-artist'
import { trackSchema } from '../../../schemas/track'
import { pageWith } from '../../../schemas/page'

export const getParser = () => {
  // track schema
  const album = albumSchema
    .omit({
      copyrights: true,
      external_ids: true,
      genres: true,
      label: true,
      popularity: true,
    })
    .merge(
      z.object({
        artists: simplifiedArtistSchema.array(),
      }),
    )

  const track = trackSchema.merge(
    z.object({
      album,
      artists: simplifiedArtistSchema.array(),
    }),
  )

  // episode schema
  const episode = episodeSchema.merge(
    z.object({
      show: showSchema,
    }),
  )

  // page of tracks and episodes
  const trackAddedBy = anotherUserSchema.omit({ images: true, display_name: true, followers: true })

  const pageItem = playlistTrackSchema.merge(
    z.object({
      added_by: trackAddedBy.nullable(),
      track: z.union([track, episode]),
    }),
  )

  return pageWith(pageItem)
}
