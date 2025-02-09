import {
    queryOptions as queryOptionsLib,
    DefinedInitialDataOptions,
    QueryOptions,
    UseQueryOptions
 } from "@tanstack/react-query"
import { fetchSearch, SearchTypeApi } from "./http-request"

export const queryOptions = ({
    query,
    types,
    market,
    limit,
    offset,
    override
}: {
    query: string
    types: SearchTypeApi[]
    market?: string
    limit?: number
    offset?: number
    override?: Partial<UseQueryOptions>
}) => {
    const options = queryOptionsLib({
        enabled: Boolean(query),
        queryKey: ['search', query, types],
        queryFn: () => fetchSearch({
            query,
            types,
            market,
            limit,
            offset,
        }),
    })
    return {
        ...options,
        ...override
    } as typeof options
}
