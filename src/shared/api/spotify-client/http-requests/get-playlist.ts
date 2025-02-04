'use server'
import { z } from "zod"
import { spotifyAxios } from "../axios-instance"
import { DATA_API_URL } from "../constants"
import { currentUserSchema } from "../schemas/current-user"
import { trackSchema } from "../schemas/track"
import { albumSchema } from "../schemas/album"
import { pageWith } from "../schemas/page"
import { playlistSchema } from "../schemas/playlist"
import { anotherUserSchema } from "../schemas/another-user"
import { playlistTrackSchema } from "../schemas/playlist-track"
import { simplifiedArtistSchema } from "../schemas/simplified-artist"
import { episodeSchema } from "../schemas/episode"
import { showSchema } from "../schemas/show"

const getParser = () => {
	// track schema
	const album = albumSchema
		.omit({
			copyrights: true,
			external_ids: true,
			genres: true,
			label: true,
			popularity: true
		})
		.merge(z.object({
			artists: simplifiedArtistSchema.array()
		}))

	const track = trackSchema.merge(z.object({
		album,
		artists: simplifiedArtistSchema.array()
	}))

	// episode schema
	const episode = episodeSchema.merge(z.object({
		show: showSchema
	}))

	// page of tracks and episodes
	const trackAddedBy = anotherUserSchema.omit({ images: true, display_name: true, followers: true, })

	const pageItem = playlistTrackSchema.merge(z.object({
		added_by: trackAddedBy.nullable(),
		track: z.union([
			track,
			episode
		])
	}))
	// .transform(data => ({
	// 	track: data.track,
	// 	meta: {
	// 		playlist: {
	// 			addedAt: data.added_at,
	// 			addedBy: data.added_by,
	// 			isLocal: data.is_local
	// 		}
	// 	}
	// }))

	return playlistSchema.merge(z.object({
		owner: anotherUserSchema.omit({
			images: true,
			followers: true
		}),
		tracks: pageWith(pageItem)
	}))
}

interface GetPlaylistArgs {
	id: string
}

export const getPlaylist = async (args: GetPlaylistArgs) => {
	// define request url
	const url = `/playlists/${args.id}`

	const response = await spotifyAxios.get(url, {
		baseURL: DATA_API_URL,
		params: {
			playlist_id: args.id,
		},
	})

	const json = response.data
	console.log('----------')
	const user = getParser().parse(json)
	console.log('----------')

	return user
}
