import { SearchFilters } from '@/features/search/filter'
import '../../global-styles.css'

export default async function SearchLayout({ children }: { children: any }) {
  return (
    <main className="mt-6 h-full overflow-y-scroll">
      <SearchFilters />
      {children}
    </main>
  )
}
