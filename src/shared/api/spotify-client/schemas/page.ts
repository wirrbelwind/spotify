import { z, ZodType } from "zod"

const pageSchema = z.object({
	href: z.string().url(),
	limit: z.number().nonnegative(),
	prev: z.string().url().nullable(),
	next: z.string().url().nullable(),
	offset: z.number().nonnegative(),
	total: z.number().nonnegative(),
})

export const pageWith = (item: ZodType) => {
	return pageSchema.extend({
		items: item.array()
	})
}
