import {
  queryOptions as queryOptionsLib,
  DefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'
import { fetchSaveTracksForCurrentUser } from './http-request'

export const mutationOptions = (args?: {
  override?: () => UseMutationOptions<unknown, Error, { ids: string[] }>
}): UseMutationOptions<unknown, Error, { ids: string[] }> => {
  return {
    mutationKey: ['save', 'tracks'],
    mutationFn: fetchSaveTracksForCurrentUser,
    ...args?.override,
  }
}
