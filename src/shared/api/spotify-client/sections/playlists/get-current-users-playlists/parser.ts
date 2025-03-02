import { z } from 'zod'
import { simplifiedPlaylistSchema } from '../../../schemas/simplified-playlist'
import { anotherUserSchema } from '../../../schemas/another-user'
import { pageWith } from '../../../schemas/page'

export const getParser = () => {
  const playlist = simplifiedPlaylistSchema.merge(
    z.object({
      tracks: z.object({
        href: z.string().url(),
        total: z.number().int(),
      }),
      owner: anotherUserSchema.omit({
        followers: true,
        images: true,
      }),
    }),
  )

  return pageWith(playlist)
}
