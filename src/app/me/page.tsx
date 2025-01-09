import { $axios } from "@/utils/$axios";
import { ArtistObject, PageObject, TrackObject } from "../types";
import { Player } from "@/entities/player/ui/Player";
import Link from "next/link";
import React from "react";
import { Avatar } from "@nextui-org/avatar";
import { Image } from "@nextui-org/image";
import UserEntity from "@/entities/user";
import { TrackList } from "@/entities/track/ui/TrackList/TrackList";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { userTopTracksOptions } from "@/api/userTopTracksOptions";
import { userOptions } from "@/api/userOptions";
import { Profile } from "@/entities/user/ui/Profile";

export default async function HomePage() {
	const queryClient = new QueryClient()

	queryClient.prefetchQuery(userTopTracksOptions(10))
	queryClient.prefetchQuery(userOptions())

	// const topResponse = await $axios.get<PageObject<TrackObject>>('https://api.spotify.com/v1/me/top/tracks?limit=10')
	// const topTrackList = topResponse.data

	// const topArtistList = (await $axios.get<PageObject<ArtistObject>>('https://api.spotify.com/v1/me/top/artists?limit=5')).data

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div>
				<Profile />
				<p className="text-4xl">Top tracks this month</p>
				<p className="mt-2">Only visible for you</p>
				<TrackList
					hideHeader
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