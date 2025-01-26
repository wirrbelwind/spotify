import { z } from "zod";
import { COUNTRY_ISO_ALPHA_2, SPOTIFY_URI } from "../constants";
import { createEntity } from "../createEntity";
import { imageSchema } from "./image";
import { externalUrlsSchema } from "./external-urls";

export const currentUserSchema = createEntity('user', {
	country: z.string().regex(COUNTRY_ISO_ALPHA_2),
	display_name: z.string().max(32).nonempty().nullable(),
	email: z.string().email(),
	// explicit_content: z.object({
	// 	filter_enabled: z.boolean(),
	// 	filter_locked: z.boolean()
	// }).optional(),
	external_urls: externalUrlsSchema,
	// followers: z.object({
	// 	href: z.string().url().nullable(),
	// 	total: z.number().nonnegative()
	// }),
	href: z.string().url(),
	images: imageSchema.array(),
	product: z.union([
		z.literal('premium'),
		z.literal('free'),
		z.literal('open'),
	]),
	uri: z.string().regex(SPOTIFY_URI)
})

export type CurrentUser = z.output<typeof currentUserSchema>
