import {
    queryOptions as queryOptionsLib,
    DefinedInitialDataOptions,
    QueryOptions,
    UseQueryOptions
 } from "@tanstack/react-query"
import { fetchSearch } from "./http-request"
import { SearchTypeApi } from "./types"

export const queryOptions = ({
    query,
    types,
    market,
    limit,
    offset,
}: {
    query: string
    types: SearchTypeApi[]
    market?: string
    limit?: number
    offset?: number
}) => {
    return queryOptionsLib({
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
}
