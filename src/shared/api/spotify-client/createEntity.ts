import { z, ZodRawShape } from "zod"
import { SPOTIFY_ID } from "./constants"

type EntityType = 'artist' | 'album' | 'user' | 'track' | 'audio_features' | 'playlist'

export const createEntity = (entity: EntityType, data: ZodRawShape) => {
	return z.object({
		id: z.string().regex(SPOTIFY_ID),
		type: z.literal(entity)
	})
		.extend(data)
}


