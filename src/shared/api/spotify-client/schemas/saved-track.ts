import { z } from 'zod'

export const savedTrack = z.object({
  added_at: z.string(),
  // track: trackSchema
})

export type SavedTrack = z.output<typeof savedTrack>
