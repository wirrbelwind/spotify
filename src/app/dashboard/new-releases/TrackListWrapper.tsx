'use client'
import { spotifyApi } from '@/shared/api/spotify-client'
import { LinksTextList } from '@/shared/ui/LinksTextList'
import { Spinner } from '@heroui/spinner'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

export const TrackListWrapper = () => {
  const releases = useQuery(spotifyApi.getNewReleases.queryOptions())

  return (
    <div className="flex flex-col gap-3">
      {releases.isSuccess &&
        releases.data.albums.items.map((album) => (
          <div className="flex gap-2">
            <Image
              alt=""
              width={160}
              height={160}
              className="w-40 h-40"
              src={album.images[0].url}
            />
            <div>
              <p>{album.name}</p>
              <p>
                <LinksTextList
                  links={album.artists.map((artist) => ({ label: artist.name, url: artist.href }))}
                />
              </p>
            </div>
          </div>
        ))}
      {releases.isLoading && <Spinner />}
      {releases.isError && JSON.stringify(releases.error)}
    </div>
  )
}
