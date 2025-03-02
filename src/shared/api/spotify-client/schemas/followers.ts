import { z } from 'zod'

export const followersSchema = z.object({
  href: z.string().url().nullable(),
  total: z.number().int().nonnegative(),
})
