'use client'

import { spotifyApi } from "@/shared/api/spotify-client"
import { Spinner } from "@heroui/spinner"
import { useQuery } from "@tanstack/react-query"
import { TrackList } from "@/entities/track"
import { MediaCard } from "@/shared/ui/MediaCard"
import { LinksTextList } from "@/shared/ui/LinksTextList"
import { SearchFilters } from "./SearchFilters"

interface SearchResultsProps {
    query: string
}

export const SearchResults = ({
    query,
}: SearchResultsProps) => {
    const search = useQuery(
        spotifyApi.search.queryOptions({
            query,
            types: [
                'album',
                'track',
                'artist',
                'audiobook',
                'episode',
                'playlist',
                'show'
            ]
        })
    )

    return (
        <div>
            {search.isLoading && (
                <Spinner />
            )}
            {search.isError && JSON.stringify(search.error)}
            {
                search.isSuccess && search.data.tracks && (
                    <div>
                        <p>Tracks</p>
                        <TrackList
                            columns={["play", "avatar", "name", "duration"]}
                            fromPlaylist={false}
                            hideHeader
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

            {
                search.isSuccess && search.data.albums && (
                    <div>
                        <p>Albums</p>
                        <div className="grid grid-cols-6 gap-2">
                            {search.data.albums.items.map(album => (
                                <MediaCard
                                    key={album.id}
                                    id={album.id}
                                    title={album.name}
                                    imageUrl={album.images[0].url}
                                    playbackUri={album.uri}
                                    subtitle={() => {
                                        return (<>
                                            <span>{new Date(album.release_date).getFullYear()}</span>
                                            <span> • </span>
                                            <LinksTextList
                                                links={album.artists.map(artist => ({
                                                    label: artist.name,
                                                    url: artist.href
                                                }))}
                                            />
                                        </>)
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
