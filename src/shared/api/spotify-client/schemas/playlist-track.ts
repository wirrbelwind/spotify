import { z } from 'zod'

export const playlistTrackSchema = z.object({
  added_at: z.string().nullable(),
  // added_by: anotherUserSchema.nullable(),
  is_local: z.boolean(),
  // track: trackSchema,
})

export type PlaylistTrack = z.output<typeof playlistTrackSchema>
