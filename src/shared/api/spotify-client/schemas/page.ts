import { z, ZodType } from "zod"

export const pageSchema = z.object({
	href: z.string().url(),
	limit: z.number().nonnegative(),
	previous: z.string().url().nullable(),
	next: z.string().url().nullable(),
	offset: z.number().nonnegative(),
	total: z.number().nonnegative(),
})

export const pageWith = <T extends ZodType>(item: T) => {
	return pageSchema.extend({
		items: item.array()
	})
}
