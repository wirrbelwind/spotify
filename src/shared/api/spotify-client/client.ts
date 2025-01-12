import 'server-only'
import { spotifyAxios } from './axios'
import { PageObject, SimplifiedPlaylistObject, TrackObject, User } from '../spotify-types'
import { AUTH_API_URL, DATA_API_URL } from './constants'
import { spotifyClient } from '.'

// TODO: write interface for client
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
				offset: resolvedOffset
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
	},
	auth: {
		tokens({
			code,
			base64Credentials
		}: { code: string, base64Credentials: string }) {
			return spotifyAxios.post('/api/token', {
				grant_type: 'authorization_code',
				code,
				redirect_uri: process.env.SPOTIFY_REDIRECT_URI
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': `Basic ${base64Credentials}`
				},
				baseURL: AUTH_API_URL
			})
		},
		refreshTokens({ refreshToken }: { refreshToken: string }) {
			return spotifyAxios.post('/api/token', {
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
				client_id: process.env.SPOTIFY_CLIENT_ID
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
				},
				baseURL: AUTH_API_URL
			})
		}
	},
	userPlaylists() {
		return spotifyAxios.get<PageObject<SimplifiedPlaylistObject>>('/me/playlists', {
			baseURL: DATA_API_URL,
		})
	}
}
