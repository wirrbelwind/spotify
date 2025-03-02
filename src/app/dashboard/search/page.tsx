import { resultsMap } from '@/features/search/results'
import { SearchType } from '@/shared/api/spotify-client/sections/search'

interface SearchPageProps {
  searchParams: Promise<{
    /**
     * Query
     */
    q: string
    searchType: SearchType
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q
  const searchType = params.searchType

  const ResultsComponent = resultsMap[searchType]

  if (!ResultsComponent) {
    throw new Error(
      `Component for search results of type "${searchType}" doesnt exist. Params: ${JSON.stringify(params)}`,
    )
  }

  return <ResultsComponent query={query} />
}
