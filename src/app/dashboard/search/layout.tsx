import { SearchFilters } from '@/features/search/filter';
import '../../../global-styles.css'
import { AllProviders } from "@/shared/providers/AllProviders";

export default async function SearchLayout({ children }: { children: any }) {
    return (
        <main className="mt-6 h-full overflow-y-scroll">
            <SearchFilters />
            {children}
        </main>
    );
}
