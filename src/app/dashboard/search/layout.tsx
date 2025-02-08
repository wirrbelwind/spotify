import '../../../global-styles.css'
import { AllProviders } from "@/shared/providers/AllProviders";
import { SearchFilters } from './SearchFilters';

export default async function SearchLayout({ children }: { children: any }) {
    return (
        <main className="mt-6 h-full overflow-y-scroll">
            <SearchFilters />
            {children}
        </main>
    );
}
