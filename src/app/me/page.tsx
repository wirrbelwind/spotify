import React from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Profile } from "@/entities/user/ui/Profile";
import { TopTracks } from "@/widget/TopTracks";
import { getUserTopTracksOptions } from "@/entities/track";

export default async function HomePage() {
	const queryClient = new QueryClient()

	queryClient.prefetchQuery(getUserTopTracksOptions(5))

	// const topResponse = await spotifyApi.get<PageObject<TrackObject>>('https://api.spotify.com/v1/me/top/tracks?limit=10')
	// const topTrackList = topResponse.data

	// const topArtistList = (await spotifyApi.get<PageObject<ArtistObject>>('https://api.spotify.com/v1/me/top/artists?limit=5')).data

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div>
				<Profile />
				<TopTracks />
			</div>
		</HydrationBoundary>
	);
}

{/* <div className={`
			flex
			items-center
			`}>
				<Avatar
					src={user.images[0].url}
					name={user.display_name ?? '?'}
					className="w-44 h-44 text-large"
				/>
				<div>
					<p>
						{user.display_name}
					</p>
					<p>
						{user.followers.total} followers
					</p>
				</div>
			</div>

			<p>Top Artists</p>
			<div className={`
			flex
			gap-2
			flex-wrap
				`}>
				{topArtistList.items.map(artist => (
					<div
						key={artist.id}
					>
						<Image
							src={artist.images?.[0]?.url}

							className="rounded-full w-40 h-40"
						/>
						<p>{artist.name}</p>
					</div>
				))}
			</div> */}