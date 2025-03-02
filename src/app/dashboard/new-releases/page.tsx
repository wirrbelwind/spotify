import { TrackListWrapper } from './TrackListWrapper'

export default async function NewReleasesPage() {
  return (
    <main className="pt-6 h-full overflow-y-scroll">
      <TrackListWrapper />
    </main>
  )
}
