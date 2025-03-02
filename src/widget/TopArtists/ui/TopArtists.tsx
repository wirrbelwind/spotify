import { spotifyApi } from '@/shared/api/spotify-client'
import { getBestFitImage } from '@/shared/lib/getBestFitImage'
import { MediaCard } from '@/shared/ui/MediaCard'

interface TopArtistsProps {}

export const TopArtists = async () => {
  const artists = await spotifyApi.getCurrentUsersTopArtists.fetch({
    limit: 7,
    timeRange: 'long_term',
  })

  return (
    <div>
      <p className="text-4xl">Top tracks of the semester</p>
      <div className="flex gap-2 flex-wrap">
        {artists.items.map((artist) => (
          <MediaCard
            id={artist.id}
            title={artist.name}
            imageUrl={
              getBestFitImage({
                images: artist.images,
                preferredSize: { width: 250, height: 250 },
              })?.url ?? '/icons/user.svg'
            }
            isRoundImage
            key={artist.id}
            playbackUri={artist.uri}
            subtitle="Artist"
          />
        ))}
      </div>
    </div>
  )
}
