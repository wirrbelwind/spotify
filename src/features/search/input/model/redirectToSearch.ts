import { SearchType } from '@/shared/api/spotify-client/sections/search'
import { routeUrl } from '@/shared/lib/route-url'
import { redirect } from 'next/navigation'

export const redirectToSearch = (query: string, searchType: SearchType) => {
  const url = routeUrl.search(query, searchType)
  redirect(url)
}
