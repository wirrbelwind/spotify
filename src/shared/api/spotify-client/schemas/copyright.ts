import { z } from 'zod'

export const copyrightSchema = z.object({
  text: z.string(),
  type: z.union([z.literal('C'), z.literal('P')]),
})

export type Copyright = z.output<typeof copyrightSchema>
