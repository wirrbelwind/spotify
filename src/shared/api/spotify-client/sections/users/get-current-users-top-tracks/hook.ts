import { 
    useQuery,
    queryOptions as queryOptionsLib,
    DefinedInitialDataOptions
 } from "@tanstack/react-query"
import { fetchCurrentUserTopTracks } from "./http-request"

export const queryOptions = (args: {
    override?: () => DefinedInitialDataOptions
    quantity: number
}) => {
    return queryOptionsLib({
        queryKey: ['current-user', 'top', 'tracks', 'get'],
        queryFn: () => fetchCurrentUserTopTracks({quantity: args.quantity}),
        ...args?.override
    })
}

export const useCurrentUserTopTracks = () => {
    const DEFAULT_QUANTITY = 5

    return useQuery(queryOptions({quantity: DEFAULT_QUANTITY}))
}
