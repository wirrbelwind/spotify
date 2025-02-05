import { 
    queryOptions as queryOptionsLib,
    DefinedInitialDataOptions,
    useMutation,
    UseMutationOptions
 } from "@tanstack/react-query"
import { fetchSaveTracksForCurrentUser } from "./http-request"

export const mutationOptions = (args: {
    override?: () => UseMutationOptions
    ids: string[]
}): UseMutationOptions => {
    return {
        mutationKey: ['save', 'tracks', args.ids],
        mutationFn: () => fetchSaveTracksForCurrentUser({
            ids: args.ids
        }),
        ...args.override
    }
}
