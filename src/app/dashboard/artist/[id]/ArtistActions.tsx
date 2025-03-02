import { StartPlaybackButton } from "@/features/playback/start-playback"
import { spotifyApi } from "@/shared/api/spotify-client"

interface ArtistActionsProps {
    artistId: string
}

export const ArtistActions = async ({ artistId }: ArtistActionsProps) => {
    const artist = await spotifyApi.getArtist.fetch({artistId})

    return (
        <div className="flex gap-4">
            <StartPlaybackButton uri={artist.uri} />
        </div>
    )
}
