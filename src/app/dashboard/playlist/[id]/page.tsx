import { TrackList } from "@/entities/track"
import { getPlaylistOptions } from "@/entities/track/api/playlist/getPlaylistOptions"
import { spotifyClient } from "@/shared/api/spotify-client"
import { getBestFitImage } from "@/shared/lib/getBestFitImage"
import { PlaylistTemplate } from "@/shared/ui/PlaylistTemplate"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { TrackListWrapper } from "./TrackListWrapper"
import { PlaylistHeader } from "./PlaylistHeader"

interface PlaylistPageProps {
	params: Promise<{
		id: string
	}>
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
	const playlistId = (await params).id

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(getPlaylistOptions(playlistId))

	return (
		<main className="pt-6 h-full overflow-y-scroll">
			<HydrationBoundary state={dehydrate(queryClient)}>
				{/* <PlaylistTemplate
			// name={playlist.data.name}
			// image={getBestFitImage({images: playlist.data.images, preferredSize: {height: 144, width: 144}})}
			// playlistId={playlistId}
			isNativePlayList={true}

		/> */}
				<PlaylistHeader playlistId={playlistId} />
				<TrackListWrapper playlistId={playlistId} />
			</HydrationBoundary>
		</main>
	)
}
