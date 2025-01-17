import { z, ZodRawShape } from "zod"
import { SPOTIFY_ID } from "./constants"

type EntityType = 'artist' | 'album' | 'user' | 'track' | 'audio_features' | 'playlist' | 'episode' | 'show'

export const createEntity = <T extends ZodRawShape>(entity: EntityType, data: T) => {
	return z.object({
		id: z.string().regex(SPOTIFY_ID),
		type: z.literal(entity)
	})
		.extend(data)
}
