import { spotifyApi } from "@/shared/api/spotify-client"
import { getBestFitImage } from "@/shared/lib/getBestFitImage"
import { MediaCard } from "@/shared/ui/MediaCard"

interface UserPlaylistsProps {
    userId: string
}

export const UserPlaylists = async ({ userId }: UserPlaylistsProps) => {
    const [
        playlists,
        user
    ] = await Promise.all([
        spotifyApi.getUsersPlaylists.fetch({
            userId,
        }),
        spotifyApi.getUsersProfile.fetch({userId})
    ])

    return (
        <div>
            <p className="text-4xl mb-4">Playlists of {user.display_name}</p>
            <div className="flex gap-2 flex-wrap">

                {
                    playlists.items.map(playlist => (
                        <MediaCard
                            id={playlist.id}
                            title={playlist.name}
                            imageUrl={
                                getBestFitImage({
                                    images: playlist.images,
                                    preferredSize: { width: 250, height: 250 }
                                })?.url ?? '/icons/user.svg'
                            }
                            isRoundImage
                            key={playlist.id}
                            playbackUri={playlist.uri}
                            subtitle={user.display_name ?? undefined}
                        />
                    ))
                }
            </div>
        </div>
    )
}