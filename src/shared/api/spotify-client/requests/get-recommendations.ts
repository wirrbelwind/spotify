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
import { recommendationsSchema } from "../schemas/recommendations"

const getParser = () => {
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
		artists: simplifiedArtistSchema,

	}))

	return recommendationsSchema.merge(z.object({
		tracks: track.array()
	}))
}

interface GetRecommendationsArgs {
	seedArtists: string
	seedGenres: string
	seedTracks: string
}

export const getRecommendations = async ({ seedArtists, seedGenres, seedTracks }: GetRecommendationsArgs) => {
	const url = '/recommendations'

	const response = await spotifyAxios.get(url, {
		baseURL: DATA_API_URL,
		params: {
			seed_artists: seedArtists,
			seed_genres: seedGenres,
			seed_tracks: seedTracks
		}
	})

	const json = response.data

	return getParser().parse(json)
}
