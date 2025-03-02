import { z } from 'zod'

export const restrictionsSchema = z.object({
  reason: z.union([z.literal('market'), z.literal('product'), z.literal('explicit')]),
})
