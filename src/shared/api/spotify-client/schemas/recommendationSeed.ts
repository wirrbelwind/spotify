import { z } from "zod";

export const recommendationSeedSchema = z.object({
	afterFilteringSize: z.number().int(),
	afterRelinkingSize: z.number().int(),
	href: z.string().url().nullable(),
	id: z.string(),
	initialPoolSize: z.number().int(),
	type: z.enum([
		'artist',
		'track',
		'genre'
	])
})