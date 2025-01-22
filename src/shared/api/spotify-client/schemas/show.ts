import { z } from "zod";
import { createEntity } from "../createEntity";
import { COUNTRY_ISO_ALPHA_2, SPOTIFY_URI } from "../constants";
import { copyrightSchema } from "./copyright";
import { imageSchema } from "./image";

export const showSchema = createEntity('show', {
	available_markets: z.string().regex(COUNTRY_ISO_ALPHA_2).array(),
	copyrights: copyrightSchema,
	description: z.string(),
	html_description: z.string(),
	explicit: z.boolean(),
	external_urls: z.object({
		spotify: z.string().url()
	}),
	href: z.string().url(),
	images: imageSchema.array(),
	is_externally_hosted: z.boolean(),
	languages: z.string().array(),
	media_type: z.string(),
	name: z.string().nonempty(),
	publisher: z.string(),
	uri: z.string().regex(SPOTIFY_URI),
	total_episodes: z.number().int()
})


export type Show = z.output<typeof showSchema>
