// import 'server-only'
import { z } from 'zod'
import { spotifyAxios } from './axios-instance'
import { AUTH_API_URL, DATA_API_URL } from './constants'
import { currentUserSchema } from './schemas/current-user'
import { pageWith } from './schemas/page'
import { playlistSchema } from './schemas/playlist'
import { trackSchema } from './schemas/track'
import { simplifiedPlaylistSchema } from './schemas/simplified-playlist'
import { recommendationsSchema } from './schemas/recommendations'
import { albumSchema } from './schemas/album'
import { anotherUserSchema } from './schemas/another-user'
import { playlistTrackSchema } from './schemas/playlist-track'
import { simplifiedArtistSchema } from './schemas/simplified-artist'

// TODO: write interface for client
export const client = {
	async user() {
		const response = await spotifyAxios.get('/me', {
			baseURL: DATA_API_URL,
		})

		const json = response.data

		const user = currentUserSchema.parse(json)
		return user
	},
	player: {
		async play({
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

			await spotifyAxios.put(`/me/player/play`, {
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
		async shuffle({ state, deviceId }: { state: boolean, deviceId: string }) {
			return await spotifyAxios.put(
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
	async checkLikes({ idList }: { idList: string[] }) {
		const response = await spotifyAxios.get('/me/tracks/contains', {
			params: {
				ids: idList.join(',')
			},
			baseURL: DATA_API_URL,
		})

		const json = response.data

		return savedTracksSchema.parse(json)
	},
	async userTopTracks({ quantity }: { quantity: number }) {
		const response = await spotifyAxios.get('/me/top/tracks', {
			params: {
				limit: quantity
			},
			baseURL: DATA_API_URL,
		})

		const json = response.data

		const track = trackSchema.merge(z.object({
			album: albumSchema.omit({
				copyrights: true,
				external_ids: true,
				genres: true,
				label: true,
				popularity: true,
				tracks: true,

			})
		}))
		const parser = pageWith(track)
		return parser.parse(json)
	},
	auth: {
		async tokens({
			code,
			base64Credentials
		}: { code: string, base64Credentials: string }) {
			const parser = z.object({
				access_token: z.string(),
				token_type: z.string(),
				scope: z.string(),
				expires_in: z.number(),
				refresh_token: z.string(),
			})
			const response = await spotifyAxios.post('/api/token', {
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

			const json = response.data

			return parser.parse(json)
		},
		async refreshTokens({ refreshToken }: { refreshToken: string }) {
			const parser = z.object({
				access_token: z.string(),
				token_type: z.string(),
				scope: z.string(),
				expires_in: z.number(),
				refresh_token: z.string(),
			})

			const response = await spotifyAxios.post('/api/token', {
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

			const json = response.data
			return parser.parse(json)
		}
	},
	async userPlaylists() {
		const parser = pageWith(simplifiedPlaylistSchema.merge(z.object({
			tracks: z.object({
				href: z.string().url(),
				total: z.number().int()
			}),
			owner: anotherUserSchema.omit({
				followers: true,
				images: true
			})
		})))

		const response = await spotifyAxios.get('/me/playlists', {
			baseURL: DATA_API_URL,
		})
		const json = response.data
		console.log(json.items[0].owner)
		return parser.parse(json)
	},
	async playlist({ id }: { id: string }) {
		const response = await spotifyAxios.get(`/playlists/${id}`, {
			params: {
				playlist_id: id,
			},
			baseURL: DATA_API_URL,
		})

		const json = response.data
		const playlist = playlistSchema.merge(z.object({
			tracks:pageWith(playlistTrackSchema).merge(z.object({
				items: playlistTrackSchema.merge(z.object({
					track: trackSchema.merge(z.object({
						album: albumSchema.omit({
							
						})
					}))
				})).array()
			}))
		}))
			// .transform(value => {
			// 	return {
			// 		...value.track,
			// 		meta: {
			// 			playlist: {
			// 				addedAt: value.added_at,
			// 				addedBy: value.added_by,
			// 				isLocal: value.is_local
			// 			}
			// 		}
			// 	}
			// })
			.parse(json)

		return playlist
	},
	async recommendations() {
		const response = await spotifyAxios.get('/recommendations', {
			baseURL: DATA_API_URL,
			params: {
				seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
				seed_genres: "classical,country",
				seed_tracks: "0c6xIDDpzE81m2q797ordA"
			}
		})

		const json = response.data

		return recommendationsSchema.parse(json)
	}
}
