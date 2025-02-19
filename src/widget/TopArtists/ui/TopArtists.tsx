import { spotifyApi } from "@/shared/api/spotify-client"
import { getBestFitImage } from "@/shared/lib/getBestFitImage"
import { MediaCard } from "@/shared/ui/MediaCard"

interface TopArtistsProps {

}

export const TopArtists = async () => {
    const artists = await spotifyApi.getCurrentUsersTopArtists.fetch({
        limit: 5,
        timeRange: 'long_term',
    })

    return (
        <div className="flex gap-2 flex-wrap">
        {
            artists.items.map(artist => (
                <MediaCard
                    id={artist.id}
                    title={artist.name}
                    imageUrl={
                        getBestFitImage({
                            images: artist.images,
                            preferredSize: {width: 250, height: 250}
                        })?.url ?? '/icons/user.svg'
                    }
                    isRoundImage
                    key={artist.id}
                    playbackUri={artist.uri}
                    subtitle="Artist"
                />
            ))
        }
        </div>
    )
}