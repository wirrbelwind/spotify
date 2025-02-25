import {
    infiniteQueryOptions as queryOptionsLib,
    DefinedInitialDataOptions
} from "@tanstack/react-query"
import { fetchNextPage, fetchPlaylistItems } from "./http-request"
import { spotifyAxios } from "../../../axios-instance"
import { z } from "zod"
import { getParser } from "./parser"

const parser = getParser()
type FirstPage = z.output<typeof parser>

export const queryOptions = (args: {
    id: string,
    initialData: FirstPage
}) => {

    return queryOptionsLib({
        queryKey: ['playlist', 'gtet', args.id],
        queryFn: async ({ pageParam }) => {
            return (await fetchNextPage(pageParam))
        },
        getNextPageParam(lastPage) {
            return lastPage.next
        },
        initialData: {
            pages: [
                args.initialData,
            ],
            pageParams: ['']
        },
        initialPageParam: ''
    })
}
