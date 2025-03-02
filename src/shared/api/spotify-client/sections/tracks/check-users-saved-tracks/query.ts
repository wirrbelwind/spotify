import { 
    queryOptions as queryOptionsLib,
    DefinedInitialDataOptions,
    UseQueryOptions
 } from "@tanstack/react-query"
import { fetchUsersSavedTracks } from "./http-request"

export const queryOptions = (args: {
    override?: Partial<UseQueryOptions>
    idList: string[]
}) => {
    return queryOptionsLib({
        queryKey: ['check-saved-tracks', args.idList],
        queryFn: () => fetchUsersSavedTracks({idList: args.idList}),
        ...args.override
    })
}
