import { ResultsProps } from "../model/ResultsProps";
import { spotifyApi } from "@/shared/api/spotify-client";
import { TrackList } from "@/entities/track";
import { Divider } from "@heroui/divider";
import { MediaCard } from "@/shared/ui/MediaCard";
import { getBestFitImage } from "@/shared/lib/getBestFitImage";
import { routeUrl } from "@/shared/lib/route-url";
import { LinksTextList } from "@/shared/ui/LinksTextList";
import { spotifyAxios } from "@/shared/api/spotify-client/axios-instance";

export const AllResults = async ({ query }: ResultsProps) => {

    const results = await spotifyApi.search.fetch({
        query,
        limit: 7,
        types: ['album', 'artist', 'audiobook', 'episode', 'playlist', 'show', 'track']
    })

    const ep = await spotifyAxios.get('https://api.spotify.com/v1/episodes/3Dnbb5eXyzAXi94OvOVTpg')
    return (
        <div>
            <p className="text-4xl">Tracks</p>
            <Divider className="opacity-0 my-2" />
            <Divider className="opacity-0 my-2" />
            <TrackList
                columns={["play", "avatar", "name", "duration"]}
                fromPlaylist={false}
                items={results.tracks?.items.map(track => ({
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
            <Divider className="opacity-0 my-4" />

            <p className="text-4xl">Artists</p>
            <Divider className="opacity-0 my-2" />
            <div className="flex gap-4">
                {
                    results.artists?.items.map(artist => (
                        <MediaCard
                            key={artist.id}
                            id={artist.id}
                            title={artist.name}
                            imageUrl={
                                getBestFitImage({
                                    images: artist.images,
                                    preferredSize: { width: 300, height: 300 }
                                })?.url ?? '/icons/user.svg'
                            }
                            isRoundImage
                            playbackUri={artist.uri}
                            url={routeUrl.artist(artist.id)}
                        />
                    ))
                }
            </div>

            <Divider className="opacity-0 my-4" />

            <p className="text-4xl">Playlists</p>
            <Divider className="opacity-0 my-2" />
            <div className="flex gap-4">
                {
                    results.playlists?.items.map(playlist => (
                        <MediaCard
                            key={playlist.id}
                            id={playlist.id}
                            title={playlist.name}
                            imageUrl={
                                getBestFitImage({
                                    images: playlist.images,
                                    preferredSize: { width: 300, height: 300 }
                                })?.url ?? '/icons/user.svg'
                            }
                            isRoundImage
                            playbackUri={playlist.uri}
                            url={routeUrl.playlist(playlist.id)}
                        />
                    ))
                }
            </div>

            <Divider className="opacity-0 my-4" />

            <p className="text-4xl">Albums</p>
            <Divider className="opacity-0 my-2" />
            <div className="grid grid-cols-6 gap-2">
                {results.albums?.items.map(album => (
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

            <Divider className="opacity-0 my-4" />

            <p className="text-4xl">Shows</p>
            <Divider className="opacity-0 my-2" />
            <div className="grid grid-cols-6 gap-2">
                {
                    results.shows?.items.map(show => (
                <MediaCard
                        id={show.id}
                        title={show.name}
                        imageUrl={
                            getBestFitImage({
                                images: show.images,
                                preferredSize: {width: 300, height: 300}
                            })?.url ?? '/icons/microphone.svg'
                        }
                        key={show.id}
                        playbackUri={show.uri}
                        url={routeUrl.show(show.id)}
                />
            ))
                }
            </div>

            <Divider className="opacity-0 my-4" />

            <p className="text-4xl">Episodes</p>
            
            <Divider className="opacity-0 my-2" />
            
            <TrackList
                columns={["play", "avatar", "name",'album', "duration"]}
                fromPlaylist={false}
                items={results.episodes?.items.map(episode => ({
                    id: episode.id,
                    uri: episode.uri,
                    durationMs: episode.duration_ms,
                    name: episode.name,
                    album: {
                        images: episode.images,
                        //TODO: api forces to make another request to get info about SHOW
                        name: 'Learn more',
                        url: routeUrl.episode(episode.id)
                    },
                    artists: []
                }))}
            />
        </div>
    )
}
