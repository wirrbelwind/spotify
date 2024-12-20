import { $axios } from "@/utils/$axios";
import { ArtistObject, PageObject, TrackObject } from "../types";
import { Player } from "@/ui/Player";
import Link from "next/link";
import React from "react";
import { Avatar } from "@nextui-org/avatar";
import { Image } from "@nextui-org/image";
import UserEntity from "@/entities/user";
import  {TrackList}  from "@/entities/track/ui/TrackList";

export default async function HomePage() {
	const user = await UserEntity.getCurrentUser()
	
	const topResponse = await $axios.get<PageObject<TrackObject>>('https://api.spotify.com/v1/me/top/tracks?limit=10')
	const topTrackList = topResponse.data

	const topArtistList = (await $axios.get<PageObject<ArtistObject>>('https://api.spotify.com/v1/me/top/artists?limit=5')).data

	return (
		<div>
			<div className={`
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

			<p>Top tracks</p>
			<TrackList tracks={topTrackList.items}/>
			

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
			</div>
			{/* 
			<Flex
				gap="2rem"
			>
				{topArtistList.items.map(artist => (
					<Card
						key={artist.id}
					>
						<Image
							src={artist.images?.[0]?.url}
							width={180}
							height={180}
						/>
						<Text>{artist.name}</Text>
					</Card>
				))}
			</Flex> */}
		</div>);
}
