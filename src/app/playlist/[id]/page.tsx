import { getPlaylistOptions } from "@/entities/track/api/playlist/getPlaylistOptions"
import { spotifyClient } from "@/shared/api/spotify-client"
import { getBestFitImage } from "@/shared/lib/getBestFitImage"
import { PlaylistTemplate } from "@/ui/PlaylistTemplate"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

interface PlaylistPageProps {
	params: Promise<{
		id: string
	}>
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
	const playlistId = (await params).id

	const queryClient = new QueryClient()

	queryClient.prefetchQuery(getPlaylistOptions(playlistId))

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
		<PlaylistTemplate
			// name={playlist.data.name}
			// image={getBestFitImage({images: playlist.data.images, preferredSize: {height: 144, width: 144}})}
			playlistId={playlistId}
		/>
		</HydrationBoundary>
	)
}