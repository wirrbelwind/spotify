'use client'
import { FC } from "react";
import { ResultsProps } from "../model/ResultsProps";
import { spotifyApi } from "@/shared/api/spotify-client";
import { useQuery } from "@tanstack/react-query";
import { MediaCard } from "@/shared/ui/MediaCard";
import { getBestFitImage } from "@/shared/lib/getBestFitImage";

export const ArtistsResults: FC<ResultsProps> = ({ query }) => {
    const search = useQuery(
        spotifyApi.search.queryOptions({
            query,
            types: [
                'artist',
            ]
        })
    )

    return (
        <div>
            {
                search.isSuccess && search.data.artists && (
                    <div>
                        <p>Artists</p>
                        <div className="grid grid-cols-6 gap-2">
                            {search.data.artists.items.map(artist => (
                                <MediaCard
                                    key={artist.id}
                                    id={artist.id}
                                    title={artist.name}
                                    imageUrl={getBestFitImage({
                                        images: artist.images,
                                        preferredSize: {width: 300, height: 300}
                                    })?.url ?? '/icons/microphone.svg'}
                                    playbackUri={artist.uri}
                                    subtitle={"Artist"}
                                    isRoundImage
                                />
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}