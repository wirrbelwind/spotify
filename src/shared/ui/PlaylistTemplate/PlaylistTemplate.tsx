'use client'

import { TrackList } from '@/entities/track'
import { PlaylistTrack } from '@/shared/api/spotify-client/schemas/playlist-track'
import { Track } from '@/shared/api/spotify-client/schemas/track'
import Image from 'next/image'
import { FC } from 'react'

type PlaylistTemplateProps =
  | {
      isNativePlayList: true
      tracks: {
        data: PlaylistTrack[]
        isLoading: boolean
      }
      imageUrl?: string
      name: string
    }
  | {
      isNativePlayList: false
      tracks: {
        data: Track[]
        isLoading: boolean
      }
      imageUrl?: string
      name: string
    }

export const PlaylistTemplate: FC<PlaylistTemplateProps> = ({
  isNativePlayList,
  tracks,
  name,
  imageUrl,
}) => {
  // const playlist = useQuery(getPlaylistOptions(playlistId))

  return (
    <div>
      <div className="flex gap-4">
        <Image
          width={144}
          height={144}
          src={imageUrl ?? ''}
          alt="playlist image"
          className="object-cover w-36 h-36"
        />

        <div>
          <p>{name}</p>
        </div>
      </div>
      <TrackList
        tracks={{
          data: playlist.data?.tracks,
          isError: playlist.isError,
          isLoading: playlist.isLoading,
        }}
        columns={['order', 'avatar', 'name', 'album', 'liked', 'duration']}
      />
    </div>
  )
}
