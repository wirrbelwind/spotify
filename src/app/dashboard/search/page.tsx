import { spotifyApi } from "@/shared/api/spotify-client"
import { QueryClient } from "@tanstack/react-query"
import { SearchResults } from "./SearchResults"

interface SearchPageProps {
	searchParams : Promise<{
        /**
         * Query
         */
		q: string
		"type"?: string
	}>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const params = await searchParams
    const query = params.q
	const searchType = params.type

	const queryClient = new QueryClient()

	// await queryClient.prefetchQuery(
	// 	spotifyApi.getPlaylist.queryOptions({id: playlistId})
	// )
	return (
		// <main className="pt-6 h-full overflow-y-scroll">
            <SearchResults 
				query={query}
				searchType={searchType}
			/>
		// </main>
	)
}
