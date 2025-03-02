'use client'

import { Button } from '@heroui/button'
import { CellProps } from '../types'
import { Spinner } from '@heroui/spinner'
import { spotifyApi } from '@/shared/api/spotify-client'
import { useMutation } from '@tanstack/react-query'

export const LikedCell: React.FC<CellProps> = ({ likes, trackIndex, track }) => {
  const isLiked = likes?.[trackIndex]

  // const like = useLike()
  const like = useMutation(spotifyApi.saveTracksForCurrentUser.mutationOptions())

  const toggleLike = () => {
    if (!isLiked) {
      like.mutate({ ids: [track.id] })
    }
  }

  return (
    <Button onPress={toggleLike}>
      {!likes && <Spinner />}
      {likes && isLiked && 'liked'}
    </Button>
  )
}
