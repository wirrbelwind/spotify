import { spotifyAxios } from "../../../axios-instance"
import { DATA_API_URL } from "../../../constants"

interface PlayArgs {
	contextUri?: string
	audioUris?: string[]
	offset?: string | number
	deviceId: string
}

export const fetchStartPlayback = async ({
	contextUri,
	audioUris,
	offset,
	deviceId
}: PlayArgs) => {
	const url = '/me/player/play'

	let resolvedOffset: undefined | { position: number } | { uri: string };
	if (typeof offset === 'number') {
		resolvedOffset = { position: offset }
	}
	if (typeof offset === 'string') {
		resolvedOffset = { uri: offset }
	}

	await spotifyAxios.put(url, {
		context_uri: contextUri,
		uris: audioUris ?? null,
		offset: resolvedOffset
	}, {
		params: {
			device_id: deviceId
		},
		baseURL: DATA_API_URL,
	})
}
