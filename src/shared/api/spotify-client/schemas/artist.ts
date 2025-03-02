import { z } from 'zod'
import { imageSchema } from './image'
import { simplifiedArtistSchema } from './simplified-artist'
import { followersSchema } from './followers'

export const artist = simplifiedArtistSchema.extend({
  followers: followersSchema,
  genres: z.string().array(),
  images: imageSchema.array(),
  popularity: z.number().min(0).max(100),
})

export type SimplifiedArtist = z.output<typeof simplifiedArtistSchema>
