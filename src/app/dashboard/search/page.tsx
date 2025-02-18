import { resultsMap } from "@/features/search/results"
import { spotifyApi } from "@/shared/api/spotify-client"
import { SearchType } from "@/shared/api/spotify-client/sections/search"
import { QueryClient } from "@tanstack/react-query"

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

	const ResultsComponent = resultsMap[searchType]
	return (
		<ResultsComponent query={query} />
	)
}
