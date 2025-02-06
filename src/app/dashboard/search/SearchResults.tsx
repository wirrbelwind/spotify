'use client'

import { spotifyApi } from "@/shared/api/spotify-client"
import { Spinner } from "@heroui/spinner"
import { useQuery } from "@tanstack/react-query"
import { TrackStrip } from "./TrackStrip"
import { TrackList } from "@/entities/track"

interface SearchResultsProps {
    query: string
}

export const SearchResults = ({
    query,
}: SearchResultsProps) => {
    const search = useQuery(
        spotifyApi.search.queryOptions({
            query,
            types: ['album', 'track'],
            override: () => ({
                enabled: Boolean(query)
            })
        })
    )

    return (
        <div>
            {search.isLoading && (
                <Spinner/>
            )}
            {search.isError && JSON.stringify(search.error)}
            <div>
                <p>Tracks</p>
                
                {/* {
                    search.isSuccess && (
                        <div>
                            {search.data.tracks?.items.map(track => (
                                <TrackStrip 
                                    name={track.name}
                                    duration={track.duration_ms}
                                    imageSrc={track.album.images[0].url}
                                    artists={track.artists.map(artist => ({
                                        label: artist.name,
                                        url: artist.href
                                    }))}
                                />
                            ))}
                        </div>
                    )
                } */}
                {
                    search.isSuccess && (
                        <TrackList 
                            columns={["play", "avatar", "name", "duration"]}
                            fromPlaylist={false}
                            hideHeader
                            items={search.data.tracks?.items?.map(track => ({
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
                    )
                }
            </div>
        </div>
    )
}
// id: string
// 	uri: string
// 	name: string
// 	artists: Array<{
// 		name: string,
// 		url: string | null
// 	}>
// 	album: {
// 		name: string
// 		images: Array<{
// 			url: string;
// 			height: number | null;
// 			width: number | null;
// 		}>
// 	}
// 	durationMs: number