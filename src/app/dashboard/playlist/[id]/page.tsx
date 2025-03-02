import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { PlaylistTracks } from './PlaylistTracks'
import { PlaylistHeader } from './PlaylistHeader'
import { spotifyApi } from '@/shared/api/spotify-client'
import { makeQueryClient } from '@/shared/lib/makeQueryClient'
interface PlaylistPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
  const playlistId = (await params).id

  const queryClient = makeQueryClient()

  await queryClient.prefetchQuery(spotifyApi.getPlaylist.queryOptions({ id: playlistId }))

  return (
    <main className="pt-6 h-full overflow-y-scroll">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PlaylistHeader playlistId={playlistId} />
        <PlaylistTracks playlistId={playlistId} />
      </HydrationBoundary>
    </main>
  )
}
