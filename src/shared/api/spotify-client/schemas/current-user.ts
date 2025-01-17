import { z } from "zod";
import { COUNRTRY_ISO_ALPHA_2, SPOTIFY_URI } from "../constants";
import { createEntity } from "../createEntity";
import { imageSchema } from "./image";

export const currentUserSchema = createEntity('user', {
	country: z.string().regex(COUNRTRY_ISO_ALPHA_2),
	display_name: z.string().max(32).nonempty().nullable(),
	email: z.string().email(),
	explicit_content: z.object({
		filter_enabled: z.boolean(),
		filter_locked: z.boolean()
	}).optional(),
	external_urls: z.object({
		spotify: z.string().url()
	}),
	followers: z.object({
		href: z.string().url().nullable(),
		total: z.number().nonnegative()
	}),
	href: z.string().url(),
	images: imageSchema.array(),
	product: z.union([
		z.literal('premium'),
		z.literal('free'),
		z.literal('open'),
	]),
	uri: z.string().regex(SPOTIFY_URI)
})