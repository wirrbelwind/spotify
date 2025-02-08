import { z, ZodRawShape } from "zod"
import { SPOTIFY_ID } from "./constants"

type EntityType = 'artist' | 'album' | 'user' | 'track' | 'audio_features' | 'playlist' | 'episode' | 'show' | 'audiobook'

export const createEntity = <T extends ZodRawShape, E extends EntityType>(entity: E, data: T) => {
	return z.object({
		id: z.string(),
		type: z.literal(entity)
	})
		.extend(data)
}
