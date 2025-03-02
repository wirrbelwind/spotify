'use client'
import { FC } from 'react'
import { ResultsProps } from '../model/ResultsProps'
import { useQuery } from '@tanstack/react-query'
import { spotifyApi } from '@/shared/api/spotify-client'
import { TrackList } from '@/entities/track'

export const EpisodesResults: FC<ResultsProps> = ({ query }) => {
  const search = useQuery(
    spotifyApi.search.queryOptions({
      query,
      types: ['episode'],
    }),
  )

  return (
    <TrackList
      fromPlaylist={false}
      items={search.data?.episodes?.items.map((episode) => ({
        album: {
          name: '',
          images: episode.images,
        },
        durationMs: episode.duration_ms,
        id: episode.id,
        name: episode.name,
        uri: episode.uri,
        artists: [],
      }))}
      columns={['play', 'avatar', 'name', 'duration']}
      initialLoading={search.isLoading}
    />
  )
}
