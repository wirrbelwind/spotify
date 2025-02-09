'use client'
import { spotifyApi } from "@/shared/api/spotify-client"
import { ResultsProps } from "./ResultsProps"
import { useQuery } from "@tanstack/react-query"
import { MediaCard } from "@/shared/ui/MediaCard"
import { LinksTextList } from "@/shared/ui/LinksTextList"
import { Spinner } from "@heroui/spinner"

export const AlbumsResults = ({ query }: ResultsProps) => {
    const search = useQuery(
        spotifyApi.search.queryOptions({
            query,
            types: [
                'album',
            ]
        })
    )

    return (
        <div>
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
            {
                search.isError && JSON.stringify(search.error)
            }
            {
                search.isLoading && <Spinner/>
            }
        </div>
    )
}