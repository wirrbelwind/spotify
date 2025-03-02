'use client'

import { spotifyApi } from '@/shared/api/spotify-client'
import { getBestFitImage } from '@/shared/lib/getBestFitImage'
import { routeUrl } from '@/shared/lib/route-url'
import { LinksTextList } from '@/shared/ui/LinksTextList'
import { Spinner } from '@heroui/spinner'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useMemo } from 'react'

interface AlbumHeroProps {
  albumId: string
}

export const AlbumHero = ({ albumId }: AlbumHeroProps) => {
  const album = useQuery(
    spotifyApi.getAlbum.queryOptions({
      id: albumId,
    }),
  )

  const avatarUrl = useMemo(() => {
    if (!album.data?.images) {
      return '/icons/album-placeholder.svg'
    }

    return (
      getBestFitImage({
        images: album.data.images,
        preferredSize: { width: 300, height: 300 },
      })?.url ?? '/icons/album-placeholder.svg'
    )
  }, [album.data?.images])

  if (album.isLoading) return <Spinner />

  if (album.isError) return JSON.stringify(album.error)

  return (
    <>
      {album.isSuccess && (
        <div className="flex gap-4 items-center">
          <Image
            alt=""
            src={avatarUrl}
            width={160}
            height={160}
            className="object-cover w-40 h-40"
          />
          <div>
            <p>{album.data.album_type.toUpperCase()}</p>
            <p>{album.data.name}</p>
            <p>
              <LinksTextList
                links={album.data.artists.map((artist) => ({
                  label: artist.name,
                  url: routeUrl.artist(artist.id),
                }))}
                divider=" • "
              />
              <p>
                <span>{new Date(album.data.release_date).getFullYear()}</span>
                <span className="mx-2">•</span>
                <span>{album.data.total_tracks} tracks</span>
              </p>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
