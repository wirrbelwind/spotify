'use client'
import { FC } from 'react'
import { ResultsProps } from '../model/ResultsProps'
import { useQuery } from '@tanstack/react-query'
import { spotifyApi } from '@/shared/api/spotify-client'
import { MediaCard } from '@/shared/ui/MediaCard'
import { getBestFitImage } from '@/shared/lib/getBestFitImage'
import { Link } from '@/shared/ui/Link'
import { routeUrl } from '@/shared/lib/route-url'

export const PlaylistsResults: FC<ResultsProps> = ({ query }) => {
  const search = useQuery(
    spotifyApi.search.queryOptions({
      query,
      types: ['playlist'],
    }),
  )

  return (
    <div className="grid grid-cols-5">
      {search.isSuccess &&
        search.data.playlists?.items.map((playlist) => (
          <MediaCard
            id={playlist.id}
            title={playlist.name}
            subtitle={
              playlist.owner
                ? () => (
                    <Link href={routeUrl.user(playlist.owner.id)}>
                      {playlist.owner.display_name}
                    </Link>
                  )
                : undefined
            }
            imageUrl={
              getBestFitImage({
                images: playlist.images,
                preferredSize: { width: 150, height: 150 },
              })?.url ?? ''
            }
            playbackUri={playlist.uri}
            url={routeUrl.playlist(playlist.id)}
          />
        ))}
    </div>
  )
}
