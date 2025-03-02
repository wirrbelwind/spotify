'use client'
import { FC, useMemo } from 'react'
import { ResultsProps } from '../model/ResultsProps'
import { spotifyApi } from '@/shared/api/spotify-client'
import { useQuery } from '@tanstack/react-query'
import { checkAccessToAudiobooks, useAudioBooksAccess } from '@/entities/user'

export const AudiobooksResults: FC<ResultsProps> = ({ query }) => {
  const isAudiobooksAllowed = useAudioBooksAccess()

  const search = useQuery(
    spotifyApi.search.queryOptions({
      query,
      types: ['audiobook'],
      override: { enabled: isAudiobooksAllowed },
    }),
  )

  return (
    <div>
      {search.isSuccess && search.data.audiobooks && (
        <div>{JSON.stringify(search.data.audiobooks)}</div>
      )}
      {!isAudiobooksAllowed && (
        <p>
          Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and
          Australia markets.
        </p>
      )}
    </div>
  )
}
