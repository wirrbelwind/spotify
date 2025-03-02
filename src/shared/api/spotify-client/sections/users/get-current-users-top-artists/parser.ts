import { z } from 'zod'
import { albumSchema } from '../../../schemas/album'
import { trackSchema } from '../../../schemas/track'
import { simplifiedArtistSchema } from '../../../schemas/simplified-artist'
import { pageWith } from '../../../schemas/page'
import { artist } from '../../../schemas/artist'

export const getParser = () => pageWith(artist)
