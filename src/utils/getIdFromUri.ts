import { Entity } from "@/app/types";

export const getIdFromUri = (uri: string, entityType: Entity['type']) => {
	const uriSeparator = ':'

	const uriParts = uri.split(uriSeparator)

	if (uriParts[0] !== 'spotify') {
		throw new Error(`First segment of uri (${uri}) doesn't start with "spotify"`)
	}

	if (uriParts[1] !== entityType) {
		throw new Error(`Second segment of uri (${uri}) is not equal to ${entityType}`)
	}

	const id = uriParts[2]

	if (!id) {
		throw new Error(`Third segment of uri (${uri}), which is ID, doesn't exist`)
	}

	return id
}
