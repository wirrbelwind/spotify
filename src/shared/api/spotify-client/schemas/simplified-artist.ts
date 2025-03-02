import { z } from 'zod'
import { SPOTIFY_URI } from '../constants'
import { createEntity } from '../createEntity'
import { externalUrlsSchema } from './external-urls'

export const simplifiedArtistSchema = createEntity('artist', {
  external_urls: externalUrlsSchema,
  href: z.string().url(),
  name: z.string().nonempty(),
  uri: z.string().regex(SPOTIFY_URI),
})

export type SimplifiedArtist = z.output<typeof simplifiedArtistSchema>
