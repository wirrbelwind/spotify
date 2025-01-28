import { TrackList } from "@/entities/track"
import { spotifyClient } from "@/shared/api/spotify-client"
import Image from "next/image"

export const RecommendationsPage = async () => {
	const recs = await spotifyClient.getRecommendations({
		seedArtists: "4NHQUGzhtTLFvgF5SZesLK",
		seedGenres: "classical,country",
		seedTracks: "0c6xIDDpzE81m2q797ordA"
	})

	return (
		<div>
			<div className="flex gap-4">

				<Image
					width={144}
					height={144}
					src={''}
					alt="playlist image"
					className="object-cover w-36 h-36"
				/>

				<div>
					<p>Recommendations</p>
				</div>
			</div>

			<TrackList
				tracks={{
					data: recs.tracks,
					isError: false,
					isLoading: false
				}}
				columns={[
					'order',
					'avatar',
					'name',
					'album',
					'liked',
					'duration'
				]}
			/>
		</div>
	)
}
