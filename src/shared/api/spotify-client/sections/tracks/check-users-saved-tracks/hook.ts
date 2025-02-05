import { 
    queryOptions as queryOptionsLib,
    DefinedInitialDataOptions
 } from "@tanstack/react-query"
import { fetchUsersSavedTracks } from "./http-request"

export const queryOptions = (args: {
    override?: () => DefinedInitialDataOptions
    idList: string[]
}) => {
    return queryOptionsLib({
        queryKey: ['check-saved-tracks', args.idList],
        queryFn: () => fetchUsersSavedTracks({idList: args.idList}),
        ...args.override
    })
}
