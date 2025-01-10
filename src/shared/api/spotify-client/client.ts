import 'server-only'
import { spotifyAxios } from './axios'
import { PageObject, TrackObject, User } from '../spotify-types'

export const client = {
	user() {
		return spotifyAxios.get<User>('https://api.spotify.com/v1/me')
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

			return spotifyAxios.put(`https://api.spotify.com/v1/me/player/play`, {
				context_uri: contextUri,
				uris: audioUris ?? null,
				// use zod
				offset: typeof offset === 'number' ? { "uri": offset } : null
			}, {
				params: {
					device_id: deviceId
				}
			})
		},
		shuffle({ state, deviceId }: { state: boolean, deviceId: string }) {
			return spotifyAxios.put(
				'https://api.spotify.com/v1/me/player/shuffle',
				{},
				{
					params: {
						state,
						device_id: deviceId
					}
				})
		}
	},
	checkLikes({ idList }: { idList: string[] }) {
		return spotifyAxios.get('https://api.spotify.com/v1/me/tracks/contains', {
			params: {
				ids: idList.join(',')
			}
		})
	},
	userTopTracks({ quantity }: { quantity: number }) {
		return spotifyAxios.get<PageObject<TrackObject>>('https://api.spotify.com/v1/me/top/tracks', {
			params: {
				limit: quantity
			}
		})
	}
}
