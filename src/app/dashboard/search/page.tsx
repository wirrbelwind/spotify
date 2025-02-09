import { spotifyApi } from "@/shared/api/spotify-client"
import { QueryClient } from "@tanstack/react-query"
import { ResultsMap, SearchType } from "./_results"

interface SearchPageProps {
	searchParams : Promise<{
        /**
         * Query
         */
		q: string
		"type": SearchType
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
	const ResultsComponent = ResultsMap[searchType]
	return (
		// <main className="pt-6 h-full overflow-y-scroll">
		<ResultsComponent query={query} />
		// </main>
	)
}
