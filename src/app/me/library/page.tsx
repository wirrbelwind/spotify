import { PageObject, SimplifiedPlaylistObject } from "@/app/types"
import { $axios } from "@/utils/$axios"
import Image from "next/image"

export default async function LibraryPage() {
	const playlists = await (await $axios.get<PageObject<SimplifiedPlaylistObject>>('https://api.spotify.com/v1/me/playlists')).data

	// return (
	// 	<Box>
	// 		<Flex
	// 			rowGap="1rem"
	// 			columnGap="1rem"
	// 			wrap="wrap"
	// 		>
	// 			{playlists.items.map(playlist => (
	// 				<Card
	// 					key={playlist.id}
	// 				>
	// 					<Image
	// 						src={playlist.images[0].url}
	// 						width={160}
	// 						height={160}

	// 					/>
	// 					<Text>{playlist.name}</Text>
	// 				</Card>
	// 			))}
	// 		</Flex>
	// 	</Box>
	// )
	return (
		<h1>library</h1>
	)
}