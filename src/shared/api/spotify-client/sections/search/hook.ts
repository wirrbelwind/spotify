import {
    queryOptions as queryOptionsLib,
    DefinedInitialDataOptions,
    QueryOptions
 } from "@tanstack/react-query"
import { fetchSearch, SearchType } from "./http-request"

export const queryOptions = ({
    query,
    types,
    market,
    limit,
    offset
}: {
    query: string
    types: SearchType[]
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
            offset
        }),
    })
}
