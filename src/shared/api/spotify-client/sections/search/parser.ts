import { z } from "zod";
import { trackSchema } from "../../schemas/track";
import { albumSchema } from "../../schemas/album";
import { simplifiedArtistSchema } from "../../schemas/simplified-artist";
import { pageWith } from "../../schemas/page";
import { artist } from "../../schemas/artist";
import { playlistSchema } from "../../schemas/playlist";
import { simplifiedPlaylistSchema } from "../../schemas/simplified-playlist";
import { anotherUserSchema } from "../../schemas/another-user";
import { showSchema } from "../../schemas/show";
import { episodeSchema } from "../../schemas/episode";
import { simplifiedAudiobookSchema } from "../../schemas/simplifiedAudiobook";

export type SearchType = 'album' | 'artist' | 'audiobook' | 'episode' | 'playlist' | 'show' | 'track'
export type ApiSearchType = 'album' | 'artist' | 'audiobook' | 'episode' | 'playlist' | 'show' | 'track'

export const getParser = () => {
    // tracks
    const albumOfTrack = albumSchema
    .merge(z.object({
        artists: simplifiedArtistSchema.array()
    }))
    .omit({
        copyrights: true,
        external_ids: true,
        genres: true,
        label: true,
        popularity: true
    })
    const track = trackSchema.merge(z.object({
        album: albumOfTrack,
        artists: simplifiedArtistSchema.array()
    }))

    // albums
    const album = albumSchema.merge(z.object({
        artists: simplifiedArtistSchema.array()
    }))
    .omit({
        copyrights: true,
        external_ids: true,
        genres: true,
        label: true,
        popularity: true
    })

    // playlists
    const playlist = simplifiedPlaylistSchema.merge(z.object({
        owner: anotherUserSchema.omit({
            images: true
        }),
        tracks: z.object({
            href: z.string().url(),
            total: z.number().int()
        })
    }))
   
    // const searchTypesMap: Record<SearchType, ParserName> = {
    //     album: 'albums',
    //     artist: 'artists',
    //     audiobook: 'audiobooks',
    //     episode: 'episodes',
    //     playlist: 'playlists',
    //     show: 'shows',
    //     track: 'tracks'
    // }

    return {
        parse<T extends SearchType>(json: any, ...types: T[]) {
            const generalParser = z.object({
                tracks: pageWith(track),
                artists: pageWith(artist),
                albums: pageWith(album),
                playlists: pageWith(playlist),
                shows: pageWith(showSchema),
                episodes: pageWith(episodeSchema),
                audiobooks: pageWith(simplifiedAudiobookSchema)
            })

            const pickData = types.reduce((acc, value) => {
                acc[value] = true

                return acc
            }, {} as Record<T, true>)

            const parser = generalParser.pick(pickData)             

            return parser.parse(json)
        }
    }
}
