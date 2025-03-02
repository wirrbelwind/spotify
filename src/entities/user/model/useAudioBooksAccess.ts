import { spotifyApi } from '@/shared/api/spotify-client'
import { useMemo } from 'react'
import { checkAccessToAudiobooks } from './checkAccessToAudiobooks'

export const useAudioBooksAccess = () => {
  const user = spotifyApi.getCurrentUsersProfile.useQuery()

  const isAudiobooksAllowed = useMemo(() => {
    if (!user.isSuccess) {
      return false
    }

    return checkAccessToAudiobooks(user.data.country)
  }, [user.data])

  return isAudiobooksAllowed
}
