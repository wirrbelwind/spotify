import { 
    queryOptions as queryOptionsLib,
    DefinedInitialDataOptions
 } from "@tanstack/react-query"
import { fetchSearch, SearchType } from "./http-request"

export const queryOptions = ({
    override,
    query,
    types,
    market,
    limit,
    offset
}: {
    override?: () => Partial<DefinedInitialDataOptions>
    query: string
    types: SearchType[]
    market?: string
    limit?: number
    offset?: number
}) => {
    return queryOptionsLib({
        queryKey: ['search', query, types],
        queryFn: () => fetchSearch({
            query,
            types,
            market,
            limit,
            offset
        }),
        ...override
    })
}
