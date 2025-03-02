import { 
    useQuery,
    queryOptions as queryOptionsLib,
    DefinedInitialDataOptions,
    UseQueryOptions
 } from "@tanstack/react-query"
import { fetchUserProfile } from "./http-request"

export const queryOptions = ({userId,override}: {
    override?: Partial<UseQueryOptions>
    userId: string
}) => {
    return queryOptionsLib({
        queryKey: ['current-user', 'get'],
        queryFn: () => fetchUserProfile({userId }),
        ...override
    })
}
