'use server'
import { spotifyAxios } from '../../../axios-instance'
import { DATA_API_URL } from '../../../constants'

interface SaveTracksForCurrentUserArgs {
  ids: string[]
}

export async function fetchSaveTracksForCurrentUser({ ids }: SaveTracksForCurrentUserArgs) {
  const url = '/me/tracks'

  const response = await spotifyAxios.put(
    url,
    {
      ids,
    },
    {
      baseURL: DATA_API_URL,
      params: {
        ids: ids.join(','),
      },
    },
  )
}
