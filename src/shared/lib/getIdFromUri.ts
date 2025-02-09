export const getIdFromUri = (uri: string) => {
	const uriSeparator = ':'

	const uriParts = uri.split(uriSeparator)

	if (uriParts[0] !== 'spotify') {
		throw new Error(`First segment of uri (${uri}) doesn't start with "spotify"`)
	}

	const id = uriParts[2]

	if (!id) {
		throw new Error(`Third segment of uri (${uri}), which is ID, doesn't exist`)
	}

	return id
}
