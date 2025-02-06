import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { TrackListWrapper } from "./TrackListWrapper"
import { PlaylistHeader } from "./PlaylistHeader"
import { spotifyApi } from "@/shared/api/spotify-client"
interface PlaylistPageProps {
	params: Promise<{
		id: string
	}>
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
	const playlistId = (await params).id

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(
		spotifyApi.getPlaylist.queryOptions({id: playlistId})
	)

	return (
		<main className="pt-6 h-full overflow-y-scroll">
			<HydrationBoundary state={dehydrate(queryClient)}>
				<PlaylistHeader playlistId={playlistId} />
				<TrackListWrapper playlistId={playlistId} />
			</HydrationBoundary>
		</main>
	)
}
