import 'server-only'
import { spotifyAxios } from './axios'
import { PageObject, TrackObject, User } from '../spotify-types'
import { DATA_API_URL } from './constants'

// write interface for client
export const client = {
	user() {
		return spotifyAxios.get<User>('/me', {
			baseURL: DATA_API_URL,
		})
	},
	player: {
		play({
			contextUri,
			audioUris,
			offset,
			deviceId
		}: {
			contextUri?: string
			audioUris?: string[]
			offset?: string | number
			deviceId: string
		}) {

			let resolvedOffset: undefined | { position: number } | { uri: string };
			if (typeof offset === 'number') {
				resolvedOffset = { position: offset }
			}
			if (typeof offset === 'string') {
				resolvedOffset = { uri: offset }
			}

			return spotifyAxios.put(`/me/player/play`, {
				context_uri: contextUri,
				uris: audioUris ?? null,
				// use zod
				offset: typeof offset === 'number' ? { "uri": offset } : null
			}, {
				params: {
					device_id: deviceId
				},
				baseURL: DATA_API_URL,
			})
		},
		shuffle({ state, deviceId }: { state: boolean, deviceId: string }) {
			return spotifyAxios.put(
				'/me/player/shuffle',
				{},
				{
					params: {
						state,
						device_id: deviceId
					},
					baseURL: DATA_API_URL,
				})
		}
	},
	checkLikes({ idList }: { idList: string[] }) {
		return spotifyAxios.get('/me/tracks/contains', {
			params: {
				ids: idList.join(',')
			},
			baseURL: DATA_API_URL,
		})
	},
	userTopTracks({ quantity }: { quantity: number }) {
		return spotifyAxios.get<PageObject<TrackObject>>('/me/top/tracks', {
			params: {
				limit: quantity
			},
			baseURL: DATA_API_URL,
		})
	}
}
