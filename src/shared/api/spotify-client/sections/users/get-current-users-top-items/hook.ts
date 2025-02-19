import {
    queryOptions as queryOptionsLib,
    UseQueryOptions
} from "@tanstack/react-query"
import { FetchUsersTopItems, fetchUsersTopItems } from "./http-request"

export const queryOptions = ({
    override,
    limit,
    type,
    offset,
    timeRange
}: FetchUsersTopItems & {
    override?: Partial<UseQueryOptions>
}) => {
    return queryOptionsLib({
        queryKey: ['current-user', 'get'],
        queryFn: () => fetchUsersTopItems({
            limit,
            type,
            offset,
            timeRange
        }),
        ...override
    })
}
