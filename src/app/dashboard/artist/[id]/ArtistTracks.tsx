'use client'

import { TrackList } from "@/entities/track"
import { spotifyApi } from "@/shared/api/spotify-client"
import { useQuery } from "@tanstack/react-query"

interface ArtistTracksProps {
    artistId: string
}

export const ArtistTracks = ({artistId}: ArtistTracksProps) => {
    const tracks = useQuery(
        spotifyApi.getArtistTopTracks.queryOptions({artistId})
    )
    
    return (
        <TrackList
            columns={["play", "avatar", "name", "duration"]}
            hideHeader
            initialLoading={tracks.isLoading}
            fromPlaylist={false}
            items={tracks.data?.tracks.map(track => ({
                uri: track.uri,
                id: track.id,
                name: track.name,
                durationMs: track.duration_ms,
                album: {
                    images: track.album.images,
                    name: track.album.name
                },
                artists: track.artists.map(artist => ({
                    name: '',
                    url: ''
                }))
            }))}
            onScrollDown={() => console.log(123)}
        />
    )
}
