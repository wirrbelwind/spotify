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
   
    return z.object({
        tracks: pageWith(track).optional(),
        artists: pageWith(artist).optional(),
        albums: pageWith(album).optional(),
        playlists: pageWith(playlist).optional(),
        shows: pageWith(showSchema).optional(),
        episodes: pageWith(episodeSchema).optional(),
        audiobooks: pageWith(simplifiedAudiobookSchema).optional()
    })
}
