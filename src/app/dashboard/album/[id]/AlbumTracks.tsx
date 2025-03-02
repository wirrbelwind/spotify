'use client'

import { TrackList } from '@/entities/track'
import { spotifyApi } from '@/shared/api/spotify-client'
import { useQuery } from '@tanstack/react-query'

interface AlbumTracks {
  albumId: string
}

export const AlbumTracks = ({ albumId }: AlbumTracks) => {
  const album = useQuery(
    spotifyApi.getAlbum.queryOptions({
      id: albumId,
    }),
  )

  return (
    <TrackList
      fromPlaylist={false}
      columns={['play', 'name', 'duration']}
      initialLoading={album.isLoading}
      items={album.data?.tracks.items.map((item) => ({
        album: {
          images: [],
          name: '',
        },
        artists: [],
        durationMs: item.duration_ms,
        id: item.id,
        name: item.name,
        uri: item.uri,
      }))}
    />
  )
}
