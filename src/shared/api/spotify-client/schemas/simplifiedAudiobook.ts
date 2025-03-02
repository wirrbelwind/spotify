import { z } from 'zod'
import { authorSchema } from './author'
import { copyrightSchema } from './copyright'
import { externalUrlsSchema } from './external-urls'
import { imageSchema } from './image'
import { narratorSchema } from './narrator'
import { SPOTIFY_URI } from '../constants'
import { createEntity } from '../createEntity'

export const simplifiedAudiobookSchema = createEntity('audiobook', {
  authors: authorSchema.array(),
  available_markets: z.string().array(),
  copyrights: copyrightSchema,
  description: z.string(),
  html_description: z.string(),
  edition: z.boolean(),
  external_urls: externalUrlsSchema,
  href: z.string().url(),
  images: imageSchema.array(),
  language: z.string().describe('Deprecated'),
  languages: z.string().array(),
  media_type: z.string(),
  name: z.string(),
  narrators: narratorSchema.array(),
  publisher: z.string(),
  uri: z.string().regex(SPOTIFY_URI),
  total_chapters: z.number().int(),
})
