import { getUser } from "@/utils/getUser";
import { $axios } from "@/utils/$axios";
import { ArtistObject, PageObject, TrackObject } from "../types";
import { Player } from "@/ui/Player";
import { cookies } from "next/headers";
import { Avatar, Box, Card, Flex, Image, Stack, Text } from '@mantine/core'
import Link from "next/link";
import React from "react";

export default async function HomePage() {
	const user = await getUser()

	const topResponse = await $axios.get<PageObject<TrackObject>>('https://api.spotify.com/v1/me/top/tracks?limit=10')
	const topTrackList = topResponse.data

	const topArtistList = (await $axios.get<PageObject<ArtistObject>>('https://api.spotify.com/v1/me/top/artists?limit=5')).data


	const cookie = await cookies()
	const accessToken = cookie.get('spotify-api:access-token')?.value

	return (<Box>
		<Flex align={"center"}>
			<Avatar
				variant="filled"
				radius="9999px"
				size="14rem"
				src={user.images[0].url}
				name={user.display_name}
			/>
			<div>
				<Text>{user.display_name}</Text>
				<Text>{user.followers.total} followers</Text>
			</div>
		</Flex>

		<Text>Top tracks</Text>
		<Stack
			bg="var(--mantine-color-body)"
			align="stretch"
			justify="flex-start"
			gap="xs"
		>
			{topTrackList.items.map((track, index) => (
				<Flex
					key={track.id}
					gap="2rem"
					align="center"
					bd="1px solid black"
				>
					<Text>{index + 1}</Text>
					<Image
						src={track.album.images[0].url}
						alt=""
						width={60}
						height={60}
					/>
					<div>
						<Text>{track.name}</Text>
						<Text>
							{track.artists.map((artist, index) => (
								<React.Fragment key={artist.id}>
									<Link href={artist.href}>{artist.name}</Link>
									{index !== track.artists.length - 1 && ', '}
								</React.Fragment>
							))}
						</Text>
					</div>
					<Link href={track.album.href}>
						{track.album.name}
					</Link>

					<Text>
						{track.duration_ms / 1000 / 60}
					</Text>
				</Flex>
			))}
		</Stack>

		<Text>Top Artists</Text>
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
		</Flex>
		{/* <Player accessToken={accessToken} /> */}
	</Box>);
}
