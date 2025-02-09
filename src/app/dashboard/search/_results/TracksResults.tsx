'use client'
import { TrackList } from "@/entities/track"
import { spotifyApi } from "@/shared/api/spotify-client"
import { useQuery } from "@tanstack/react-query"
import { ResultsProps } from "./ResultsProps"

export const TracksResults = ({ query }: ResultsProps) => {
    const search = useQuery(
        spotifyApi.search.queryOptions({
            query,
            types: [
                'track',
            ]
        })
    )

    return (
        <div className="mt-4">
            {
                search.isSuccess && search.data.tracks && (
                    <div>
                        <TrackList
                            columns={["play", "avatar", "name", "duration"]}
                            fromPlaylist={false}
                            items={search.data.tracks?.items.map(track => ({
                                id: track.id,
                                uri: track.uri,
                                durationMs: track.duration_ms,
                                name: track.name,
                                album: {
                                    images: track.album.images,
                                    name: track.album.name,
                                },
                                artists: track.artists.map(artist => ({
                                    name: artist.name,
                                    url: artist.href
                                }))
                            }))}
                        />
                    </div>
                )
            }
        </div>
    )
}